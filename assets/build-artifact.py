#!/usr/bin/env python3
"""
build-artifact.py — turn a local lesson into a publishable Artifact.

Artifacts are single self-contained pages: they cannot load ../assets/course.css
or link to sibling files on disk. This script inlines the shared stylesheet and
scripts, strips the document wrapper the Artifact runtime supplies itself, and
rewrites local links to published URLs.

    python3 assets/build-artifact.py lessons/0001-foo.html <out.html>

Published URLs live in assets/artifact-urls.json as {"local/path.html": "https://..."}.
A local link with no mapping is unwrapped to plain text rather than left dangling.
"""

import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
URLMAP = os.path.join(ROOT, "assets", "artifact-urls.json")


def load_urls():
    if os.path.exists(URLMAP):
        with open(URLMAP) as f:
            return json.load(f)
    return {}


def inline_assets(html, src_dir):
    """Replace local <link rel=stylesheet> and <script src> with inline content."""

    def css(m):
        href = m.group(1)
        if href.startswith("http"):
            return m.group(0)  # keep Google Fonts
        path = os.path.normpath(os.path.join(src_dir, href))
        with open(path) as f:
            return "<style>\n" + f.read().rstrip() + "\n</style>"

    html = re.sub(r'<link\s+rel="stylesheet"\s+href="([^"]+)"\s*>', css, html)

    def js(m):
        src = m.group(1)
        if src.startswith("http"):
            return m.group(0)
        path = os.path.normpath(os.path.join(src_dir, src))
        with open(path) as f:
            body = f.read().rstrip()
        # A literal </script> anywhere in the JS -- even inside a comment --
        # would close the block early. Escaping the slash is the standard fix.
        body = body.replace("</script>", "<\\/script>")
        return "<script>\n" + body + "\n</script>"

    html = re.sub(r'<script\s+src="([^"]+)"[^>]*>\s*</script>', js, html)
    return html


def rewrite_links(html, src_dir, urls):
    """Point local links at published artifacts; unwrap the ones with no home."""

    def link(m):
        whole, href = m.group(0), m.group(1)
        if href.startswith(("http", "#", "mailto:")):
            return whole
        rel = os.path.relpath(os.path.normpath(os.path.join(src_dir, href)), ROOT)
        if rel in urls:
            return whole.replace('href="%s"' % href, 'href="%s"' % urls[rel])
        return "<a-dead>"  # marked, then unwrapped below

    html = re.sub(r'<a\s+href="([^"]+)"\s*>', link, html)

    # Unwrap dead links: <a-dead>text</a>  ->  text
    html = re.sub(r"<a-dead>(.*?)</a>", r"\1", html, flags=re.S)
    return html


def strip_wrapper(html):
    """Remove the document scaffolding the Artifact runtime provides."""
    html = re.sub(r"<!doctype html>\s*", "", html, flags=re.I)
    html = re.sub(r"</?html[^>]*>\s*", "", html, flags=re.I)
    # The lookahead matters: a bare "</?head[^>]*>" also eats <header class="...">,
    # silently dropping the masthead wrapper from every published lesson.
    html = re.sub(r"</?head(?=[\s>])[^>]*>\s*", "", html, flags=re.I)
    html = re.sub(r"</?body[^>]*>\s*", "", html, flags=re.I)
    html = re.sub(r'<meta\s+charset[^>]*>\s*', "", html, flags=re.I)
    html = re.sub(r'<meta\s+name="viewport"[^>]*>\s*', "", html, flags=re.I)
    return html.strip() + "\n"


def main():
    if len(sys.argv) < 3:
        sys.exit("usage: build-artifact.py <lesson.html> <out.html>")

    src, out = sys.argv[1], sys.argv[2]
    src_dir = os.path.dirname(os.path.abspath(src))

    with open(src) as f:
        html = f.read()

    html = inline_assets(html, src_dir)
    html = rewrite_links(html, src_dir, load_urls())
    html = strip_wrapper(html)

    with open(out, "w") as f:
        f.write(html)

    print("built %s -> %s (%d bytes)" % (src, out, len(html)))
    # "<head" alone would false-positive on <header>, which we now keep.
    for tag in (r"<!doctype", r"</?html[\s>]", r"</?head[\s>]", r"</?body[\s>]"):
        if re.search(tag, html, flags=re.I):
            print("  WARNING: %s survived stripping" % tag)


if __name__ == "__main__":
    main()
