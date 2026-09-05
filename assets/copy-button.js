/* ============================================================
   copy-button.js — copy control for code blocks
   Reusable across all lessons. No dependencies.

   USAGE
   -----
   Terminal block (button lands in the title bar):
     <div class="term" data-copy>
       <div class="term-bar"><span class="dot"></span><span class="label">zsh</span></div>
       <pre><code><span class="p">$ </span>git status</code></pre>
     </div>

   Plain block (button floats top-right):
     <pre class="plain" data-copy><code>file contents</code></pre>

   Prompt markers <span class="p">$ </span> are stripped from the copied
   text, so a learner can paste straight into a terminal.
   ============================================================ */

(function () {
  "use strict";

  function textOf(root) {
    var pre = root.matches("pre") ? root : root.querySelector("pre");
    if (!pre) return "";
    var clone = pre.cloneNode(true);
    clone.querySelectorAll(".p, .copy-btn").forEach(function (n) { n.remove(); });
    return clone.textContent.replace(/\n{3,}/g, "\n\n").trim();
  }

  function makeButton(root) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "copy-btn";
    btn.textContent = "copy";
    btn.setAttribute("aria-label", "Copy code to clipboard");

    btn.addEventListener("click", function () {
      var text = textOf(root);

      var finish = function (ok) {
        btn.textContent = ok ? "copied" : "failed";
        btn.classList.toggle("is-done", ok);
        setTimeout(function () {
          btn.textContent = "copy";
          btn.classList.remove("is-done");
        }, 1400);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(
          function () { finish(true); },
          function () { finish(false); }
        );
        return;
      }

      // Fallback for file:// pages without the async clipboard API.
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.style.cssText = "position:fixed;top:0;left:0;opacity:0";
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
      document.body.removeChild(ta);
      finish(ok);
    });

    return btn;
  }

  function attach(root) {
    if (root.querySelector(".copy-btn")) return;
    var btn = makeButton(root);
    var bar = root.querySelector(".term-bar");
    if (bar) {
      bar.appendChild(btn);
    } else {
      root.appendChild(btn);
      root.classList.add("has-copy");
    }
  }

  function boot() {
    document.querySelectorAll("[data-copy]").forEach(attach);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
