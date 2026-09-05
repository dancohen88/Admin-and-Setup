/* ============================================================
   quiz.js — self-grading retrieval-practice component
   Reusable across all lessons. No dependencies.

   USAGE
   -----
   <div class="quiz" data-quiz>
     <p class="q-stem">What does <code>git push</code> do?</p>
     <button class="q-opt" data-correct>Sends commits to GitHub</button>
     <button class="q-opt">Saves changes to disk</button>
     <div class="q-why">Explanation shown after answering.</div>
   </div>

   Then load assets/quiz.js with a defer attribute.

   AUTHORING RULE
   --------------
   Every option in a question must have the SAME word count, and as close to
   the same character count as possible. Length is an unintended clue —
   learners pick the longest option. Keep them level.
   ============================================================ */

(function () {
  "use strict";

  function initQuiz(quiz) {
    var opts = Array.prototype.slice.call(quiz.querySelectorAll(".q-opt"));
    var why = quiz.querySelector(".q-why");
    if (why) why.hidden = true;

    opts.forEach(function (opt) {
      opt.type = "button";
      opt.setAttribute("aria-pressed", "false");

      opt.addEventListener("click", function () {
        if (quiz.dataset.answered === "true") return;
        quiz.dataset.answered = "true";

        var isRight = opt.hasAttribute("data-correct");

        opts.forEach(function (o) {
          o.disabled = true;
          if (o.hasAttribute("data-correct")) o.classList.add("is-correct");
        });

        opt.classList.add(isRight ? "is-picked-right" : "is-picked-wrong");
        opt.setAttribute("aria-pressed", "true");

        if (why) {
          why.hidden = false;
          why.classList.add("is-shown");
        }

        quiz.classList.add(isRight ? "quiz-right" : "quiz-wrong");
        quiz.dispatchEvent(
          new CustomEvent("quiz:answered", { bubbles: true, detail: { correct: isRight } })
        );
      });
    });

    // Retry: lets the learner space the practice and try again later.
    var retry = quiz.querySelector(".q-retry");
    if (retry) {
      retry.type = "button";
      retry.addEventListener("click", function () {
        quiz.dataset.answered = "false";
        quiz.classList.remove("quiz-right", "quiz-wrong");
        if (why) { why.hidden = true; why.classList.remove("is-shown"); }
        opts.forEach(function (o) {
          o.disabled = false;
          o.classList.remove("is-correct", "is-picked-right", "is-picked-wrong");
          o.setAttribute("aria-pressed", "false");
        });
      });
    }
  }

  function boot() {
    document.querySelectorAll("[data-quiz]").forEach(initQuiz);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
