/* ============================================
   PORTFOLIO — script.js
   Navigation, animations, skills, mini-games,
   custom cursor, work toggles & effects
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- CUSTOM CURSOR ---------- */
  const cursorDot = document.getElementById("cursor-dot");
  const cursorRing = document.getElementById("cursor-ring");
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + "px";
    cursorDot.style.top = mouseY + "px";
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    cursorRing.style.left = ringX + "px";
    cursorRing.style.top = ringY + "px";
    requestAnimationFrame(animateRing);
  }
  animateRing();

  /* Cursor hover state on interactive elements */
  function bindCursorHover(el) {
    el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
    el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
  }

  document.querySelectorAll("a, button, input, textarea, .skill-tile, .work-item").forEach(bindCursorHover);

  /* ---------- SCROLL ANIMATIONS ---------- */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));

  /* ---------- STICKY NAV SHADOW ---------- */
  const nav = document.getElementById("nav");
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 10);
  });

  /* ---------- MOBILE NAV TOGGLE ---------- */
  const toggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  toggle.addEventListener("click", () => {
    const open = toggle.classList.toggle("open");
    navLinks.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open);
  });

  /* Close mobile nav on link click */
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggle.classList.remove("open");
      navLinks.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- ACTIVE NAV LINK ---------- */
  const sections = document.querySelectorAll("section[id]");
  const navAnchors = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY + 140;
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");
      const link = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (link) {
        link.classList.toggle("active", scrollY >= top && scrollY < top + height);
      }
    });
  });

  /* ---------- SUBTLE PARALLAX ON HERO BG TEXT ---------- */
  const heroBgText = document.querySelector(".hero-bg-text");
  if (heroBgText) {
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      heroBgText.style.transform = `translate(-50%, calc(-50% + ${scrollY * 0.3}px))`;
    });
  }

  /* ========================================
     WORK ITEM TOGGLES
     ======================================== */
  document.querySelectorAll(".work-toggle").forEach((btn) => {
    const article = btn.closest(".work-item");
    const details = article.querySelector(".work-item-details");

    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      if (expanded) {
        details.classList.add("collapsed");
        btn.setAttribute("aria-expanded", "false");
        btn.textContent = "+ Expand";
      } else {
        details.classList.remove("collapsed");
        btn.setAttribute("aria-expanded", "true");
        btn.textContent = "- Collapse";
      }
    });
  });

  /* ========================================
     SKILLS
     ======================================== */
  const skillsData = [
    { name: "HTML / CSS",    level: 90, color: "#a3e635", desc: "Semantic markup, responsive layouts with Flexbox and Grid, Bootstrap framework. I build clean, accessible front-ends that look great on any device." },
    { name: "JavaScript",    level: 85, color: "#f59e0b", desc: "Vanilla JS, ES6+, DOM manipulation, async patterns. I bring interactivity and dynamic behavior to every project I work on." },
    { name: "React",         level: 80, color: "#2dd4bf", desc: "Component architecture, hooks, state management. I build dynamic single-page applications like Paw Partners for real-world use cases." },
    { name: "Python",        level: 85, color: "#a3e635", desc: "Clean, readable code for web apps and scripting. Python is my go-to for backend logic and rapid prototyping." },
    { name: "Django",        level: 80, color: "#ff3cac", desc: "Full-featured web framework for building robust backends. I used Django to power HobbyHotspot's community features and data layer." },
    { name: "Java",          level: 75, color: "#8b5cf6", desc: "Object-oriented programming, Spring framework fundamentals. I'm comfortable with enterprise-grade Java development." },
    { name: "Spring",        level: 70, color: "#f59e0b", desc: "Spring Boot for RESTful APIs and backend services. A solid framework for building scalable, production-ready applications." },
    { name: "Bootstrap",     level: 85, color: "#2dd4bf", desc: "Rapid responsive design with Bootstrap's grid system and components. Great for building polished UIs quickly without reinventing the wheel." },
  ];

  const skillsGrid = document.getElementById("skills-grid");
  const skillDetail = document.getElementById("skill-detail");
  const skillDetailTitle = document.getElementById("skill-detail-title");
  const skillDetailDesc = document.getElementById("skill-detail-desc");

  const circumference = 2 * Math.PI * 24; // r = 24

  skillsData.forEach((skill) => {
    const tile = document.createElement("button");
    tile.className = "skill-tile fade-up";
    tile.setAttribute("aria-label", `${skill.name}: ${skill.level}%`);

    const offset = circumference - (skill.level / 100) * circumference;

    tile.innerHTML = `
      <svg class="skill-ring" viewBox="0 0 56 56">
        <circle cx="28" cy="28" r="24" class="skill-ring-bg"/>
        <circle cx="28" cy="28" r="24" class="skill-ring-fill"
          style="stroke:${skill.color};stroke-dasharray:${circumference};stroke-dashoffset:${circumference}"
          data-target="${offset}"/>
      </svg>
      <div class="skill-name">${skill.name}</div>
      <div class="skill-level" style="color:${skill.color}">${skill.level}%</div>
    `;

    tile.addEventListener("click", () => {
      skillDetailTitle.textContent = skill.name;
      skillDetailDesc.textContent = skill.desc;
      skillDetail.hidden = false;
      skillDetail.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });

    bindCursorHover(tile);
    skillsGrid.appendChild(tile);
    observer.observe(tile);
  });

  /* Animate skill rings when they become visible */
  const ringObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const ring = entry.target.querySelector(".skill-ring-fill");
          if (ring) {
            setTimeout(() => {
              ring.style.strokeDashoffset = ring.dataset.target;
            }, 200);
          }
        }
      });
    },
    { threshold: 0.3 }
  );

  document.querySelectorAll(".skill-tile").forEach((t) => ringObserver.observe(t));

  /* Close skill detail */
  document.querySelector(".skill-detail-close").addEventListener("click", () => {
    skillDetail.hidden = true;
  });

  /* ========================================
     GAME TABS
     ======================================== */
  const gameTabs = document.querySelectorAll(".game-tab");
  const gamePanels = document.querySelectorAll(".game-panel");

  gameTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      gameTabs.forEach((t) => t.classList.remove("active"));
      gamePanels.forEach((p) => p.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById(`game-${tab.dataset.game}`).classList.add("active");
    });
  });

  /* ========================================
     GAME 1 — FIX THE BUG
     ======================================== */
  const bugChallenges = [
    {
      code: `.card img {\n  width: 100%;\n  height: 100%;\n  object-fit: none;  /* <-- bug */\n}`,
      question: "The image is stretching and looks distorted. What should you change?",
      options: [
        { text: 'object-fit: cover;', correct: true },
        { text: 'height: auto;', correct: false },
        { text: 'display: block;', correct: false },
      ],
      explanation: "object-fit: cover ensures the image fills its container while preserving aspect ratio. 'none' applies no fitting, causing distortion when width and height are both set.",
    },
    {
      code: `function greet(name) {\n  const message =\n    "Hello, " + Name;  /* <-- bug */\n  return message;\n}\n\nconsole.log(greet("Amanda"));`,
      question: "This function throws a ReferenceError. Which fix is correct?",
      options: [
        { text: 'Change Name to name (lowercase)', correct: true },
        { text: 'Change const to let', correct: false },
        { text: 'Add a semicolon after "Hello, "', correct: false },
      ],
      explanation: "JavaScript is case-sensitive. The parameter is 'name' but the code references 'Name', which is undefined. Variables must match their declared casing exactly.",
    },
    {
      code: `<button onclick="submit()">\n  Send\n</button>\n\n<script>\n  function submit() {\n    document.forms[0].submit();  /* <-- bug */\n    alert("Sent!");\n  }\n</script>`,
      question: "The alert never fires. What's the issue?",
      options: [
        { text: 'form.submit() reloads the page before alert runs', correct: true },
        { text: 'onclick should be onClick', correct: false },
        { text: 'alert() is deprecated', correct: false },
      ],
      explanation: "Calling form.submit() causes a full page navigation, so any code after it never executes. You'd need to use AJAX/fetch or call event.preventDefault() first.",
    },
    {
      code: `.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n}\n/* Child stays at top-left */`,
      question: "The child element stays at the top-left instead of centering. What's likely wrong?",
      options: [
        { text: 'The child has position: absolute without matching coordinates', correct: true },
        { text: 'justify-content should be justify-items', correct: false },
        { text: 'height: 100vh doesn\'t work with flex', correct: false },
      ],
      explanation: "If a child has position: absolute, it's removed from the flex flow and ignores the parent's flex alignment. Remove the absolute positioning or set top: 50% and left: 50% with transform to center it.",
    },
  ];

  let bugIndex = 0;
  let bugScore = 0;
  const bugArea = document.getElementById("bug-game-area");
  const bugCounter = document.getElementById("bug-counter");

  function updateBugCounter() {
    if (bugCounter) {
      bugCounter.textContent = `${bugIndex + 1}/${bugChallenges.length}`;
    }
  }

  function renderBugChallenge() {
    const c = bugChallenges[bugIndex];
    if (!c) {
      renderBugScore();
      return;
    }

    updateBugCounter();

    const dots = bugChallenges
      .map((_, i) => {
        let cls = "bug-dot";
        if (i < bugIndex) cls += bugResults[i] ? " done-correct" : " done-wrong";
        if (i === bugIndex) cls += " current";
        return `<div class="${cls}"></div>`;
      })
      .join("");

    const optionsHTML = c.options
      .map((o, i) => `<button type="button" class="bug-option" data-idx="${i}">${o.text}</button>`)
      .join("");

    bugArea.innerHTML = `
      <div class="bug-progress">${dots}</div>
      <div class="bug-code">${c.code}</div>
      <p style="margin-bottom:16px;font-weight:600;">${c.question}</p>
      <div class="bug-options">${optionsHTML}</div>
    `;

    bugArea.querySelectorAll(".bug-option").forEach((btn) => {
      btn.addEventListener("click", () => handleBugAnswer(btn));
    });
  }

  const bugResults = [];

  function handleBugAnswer(btn) {
    const c = bugChallenges[bugIndex];
    const idx = parseInt(btn.dataset.idx);
    const correct = c.options[idx].correct;
    bugResults[bugIndex] = correct;

    if (correct) bugScore++;

    bugArea.querySelectorAll(".bug-option").forEach((b, i) => {
      b.disabled = true;
      if (c.options[i].correct) b.classList.add("correct");
      if (i === idx && !correct) b.classList.add("wrong");
    });

    /* Update dots */
    const dots = bugArea.querySelectorAll(".bug-dot");
    dots[bugIndex].classList.remove("current");
    dots[bugIndex].classList.add(correct ? "done-correct" : "done-wrong");

    const feedbackDiv = document.createElement("div");
    feedbackDiv.className = `bug-feedback ${correct ? "success" : "error"}`;
    feedbackDiv.textContent = (correct ? "Correct! " : "Not quite. ") + c.explanation;
    bugArea.appendChild(feedbackDiv);

    const nextBtn = document.createElement("button");
    nextBtn.type = "button";
    nextBtn.className = "bug-next-btn";
    nextBtn.textContent = bugIndex < bugChallenges.length - 1 ? "Next Challenge" : "See Results";
    nextBtn.addEventListener("click", () => {
      bugIndex++;
      renderBugChallenge();
    });
    bugArea.appendChild(nextBtn);
  }

  function renderBugScore() {
    const pct = Math.round((bugScore / bugChallenges.length) * 100);
    let msg = pct === 100 ? "Perfect score! You really know your stuff." :
              pct >= 50  ? "Nice work! You've got a solid foundation." :
                           "Keep learning — web dev has endless depth!";
    bugArea.innerHTML = `
      <div class="bug-score">
        <h4>${bugScore} / ${bugChallenges.length} Correct</h4>
        <p>${msg}</p>
        <button type="button" class="bug-restart-btn">Play Again</button>
      </div>
    `;
    bugArea.querySelector(".bug-restart-btn").addEventListener("click", () => {
      bugIndex = 0;
      bugScore = 0;
      bugResults.length = 0;
      renderBugChallenge();
    });
  }

  renderBugChallenge();

  /* ========================================
     GAME 2 — PAGE BUILDER (CLICK TO PLACE)
     ======================================== */
  const builderComponents = [
    { id: "navbar", label: "Navbar", icon: "\u2261", tag: "<nav>" },
    { id: "hero", label: "Hero Section", icon: "\u2605", tag: "<header>" },
    { id: "cards", label: "Content Cards", icon: "\u25A1", tag: "<section>" },
    { id: "cta", label: "Call to Action", icon: "\u25B6", tag: "<footer>" },
  ];
  const correctOrder = ["navbar", "hero", "cards", "cta"];

  const builderPieces = document.getElementById("builder-pieces");
  const builderPreview = document.getElementById("builder-preview");
  const builderScore = document.getElementById("builder-score");
  const builderCounter = document.getElementById("builder-counter");
  const dropzones = builderPreview.querySelectorAll(".builder-dropzone");
  let selectedPiece = null;
  let builderLocked = false;

  function shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function initBuilder() {
    builderPieces.innerHTML = "";
    selectedPiece = null;
    builderLocked = false;
    const shuffled = shuffleArray(builderComponents);
    shuffled.forEach((comp) => {
      const btn = document.createElement("button");
      btn.className = "builder-piece";
      btn.type = "button";
      btn.dataset.id = comp.id;
      btn.innerHTML = `
        <span class="builder-piece-icon">${comp.icon}</span>
        <span class="builder-piece-label">${comp.label}</span>
        <span class="builder-piece-tag">${comp.tag}</span>
      `;
      builderPieces.appendChild(btn);
    });

    dropzones.forEach((dz, i) => {
      dz.classList.remove("filled", "correct", "wrong", "drag-over");
      dz.removeAttribute("data-filled");
      dz.removeAttribute("data-component");
      dz.setAttribute("data-label", `Slot ${i + 1}`);
    });

    builderScore.textContent = "";
    builderScore.className = "builder-score";
    builderCounter.textContent = "0/4";
  }

  /* Click a piece to select it */
  builderPieces.addEventListener("click", (e) => {
    if (builderLocked) return;
    const piece = e.target.closest(".builder-piece");
    if (!piece) return;

    /* Deselect if clicking same piece */
    if (selectedPiece === piece) {
      piece.classList.remove("selected");
      selectedPiece = null;
      dropzones.forEach((dz) => dz.classList.remove("drag-over"));
      return;
    }

    /* Select new piece */
    builderPieces.querySelectorAll(".builder-piece").forEach((p) => p.classList.remove("selected"));
    piece.classList.add("selected");
    selectedPiece = piece;

    /* Highlight available slots */
    dropzones.forEach((dz) => {
      if (!dz.dataset.component) {
        dz.classList.add("drag-over");
      }
    });
  });

  /* Click a slot to place the selected piece */
  dropzones.forEach((dz) => {
    dz.addEventListener("click", () => {
      if (builderLocked) return;

      /* If slot is filled and no piece selected, pop it back */
      if (dz.dataset.component && !selectedPiece) {
        const compId = dz.dataset.component;
        const comp = builderComponents.find((c) => c.id === compId);
        dz.classList.remove("filled", "correct", "wrong");
        dz.removeAttribute("data-filled");
        dz.removeAttribute("data-component");
        dz.setAttribute("data-label", `Slot ${parseInt(dz.dataset.slot) + 1}`);

        /* Add piece back */
        const btn = document.createElement("button");
        btn.className = "builder-piece";
        btn.type = "button";
        btn.dataset.id = comp.id;
        btn.innerHTML = `
          <span class="builder-piece-icon">${comp.icon}</span>
          <span class="builder-piece-label">${comp.label}</span>
          <span class="builder-piece-tag">${comp.tag}</span>
        `;
        builderPieces.appendChild(btn);
        updateBuilderCounter();
        return;
      }

      /* Place selected piece in empty slot */
      if (!selectedPiece || dz.dataset.component) return;

      const compId = selectedPiece.dataset.id;
      const comp = builderComponents.find((c) => c.id === compId);
      if (!comp) return;

      dz.dataset.component = compId;
      dz.dataset.filled = `${comp.icon}  ${comp.label}`;
      dz.classList.add("filled");
      dz.removeAttribute("data-label");

      /* Remove piece from source */
      selectedPiece.remove();
      selectedPiece = null;

      /* Clear highlights */
      dropzones.forEach((z) => z.classList.remove("drag-over"));

      updateBuilderCounter();
      checkBuilderScore();
    });
  });

  function updateBuilderCounter() {
    let placed = 0;
    dropzones.forEach((dz) => { if (dz.dataset.component) placed++; });
    builderCounter.textContent = `${placed}/4`;
  }

  function checkBuilderScore() {
    let placed = 0;
    dropzones.forEach((dz) => { if (dz.dataset.component) placed++; });
    if (placed < 4) return;

    builderLocked = true;

    /* Score it */
    let correct = 0;
    dropzones.forEach((dz, i) => {
      if (dz.dataset.component === correctOrder[i]) {
        dz.classList.add("correct");
        correct++;
      } else {
        dz.classList.add("wrong");
      }
    });

    if (correct === 4) {
      builderScore.textContent = "UX Score: 100 — Perfect layout!";
      builderScore.className = "builder-score perfect";
    } else if (correct >= 2) {
      builderScore.textContent = `UX Score: ${correct * 25} — Almost there!`;
      builderScore.className = "builder-score partial";
    } else {
      builderScore.textContent = `UX Score: ${correct * 25} — Bad UX, try again!`;
      builderScore.className = "builder-score bad";
    }

    /* Add reset button */
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "builder-reset";
    btn.textContent = "Try Again";
    btn.addEventListener("click", initBuilder);
    builderScore.appendChild(document.createElement("br"));
    builderScore.appendChild(btn);
  }

  initBuilder();

  /* ========================================
     GAME 3 — WEB MYTHS (TRUE / FALSE)
     ======================================== */
  const myths = [
    {
      statement: "Adding more meta keywords improves your Google search ranking.",
      answer: false,
      explanation: "Google has ignored the meta keywords tag since 2009. Focus on quality content, proper semantic HTML, and useful metadata like title and description.",
    },
    {
      statement: "A website should load in under 3 seconds for optimal user retention.",
      answer: true,
      explanation: "Studies show 53% of mobile users abandon a site that takes over 3 seconds to load. Google also uses page speed as a ranking factor.",
    },
    {
      statement: "HTTPS only matters for e-commerce sites that handle payments.",
      answer: false,
      explanation: "HTTPS is essential for all websites. It protects user data, prevents tampering, is a Google ranking signal, and is required for many modern browser features.",
    },
    {
      statement: "CSS Grid and Flexbox can be used together in the same layout.",
      answer: true,
      explanation: "They complement each other. Grid is great for 2D page layouts, while Flexbox excels at 1D alignment within components. Most modern sites use both.",
    },
    {
      statement: "JavaScript frameworks are always better than vanilla JS for web projects.",
      answer: false,
      explanation: "Frameworks add overhead and complexity. For simple sites, vanilla JS is faster to load and easier to maintain. Choose frameworks when the project's complexity justifies it.",
    },
    {
      statement: "Alt text on images helps both accessibility and SEO.",
      answer: true,
      explanation: "Screen readers use alt text to describe images to visually impaired users, and search engines use it to understand image content for indexing.",
    },
  ];

  let mythIndex = 0;
  let mythScore = 0;
  const mythResults = [];
  const mythArea = document.getElementById("myths-game-area");
  const mythCounter = document.getElementById("myth-counter");

  function updateMythCounter() {
    if (mythCounter) {
      mythCounter.textContent = `${mythIndex + 1}/${myths.length}`;
    }
  }

  function renderMyth() {
    const m = myths[mythIndex];
    if (!m) {
      renderMythScore();
      return;
    }

    updateMythCounter();

    const dots = myths
      .map((_, i) => {
        let cls = "myth-dot";
        if (i < mythIndex) cls += mythResults[i] ? " done-correct" : " done-wrong";
        if (i === mythIndex) cls += " current";
        return `<div class="${cls}"></div>`;
      })
      .join("");

    mythArea.innerHTML = `
      <div class="myth-progress">${dots}</div>
      <p class="myth-statement">"${m.statement}"</p>
      <div class="myth-buttons">
        <button type="button" class="myth-btn" data-answer="true">True</button>
        <button type="button" class="myth-btn" data-answer="false">False</button>
      </div>
    `;

    mythArea.querySelectorAll(".myth-btn").forEach((btn) => {
      btn.addEventListener("click", () => handleMythAnswer(btn));
    });
  }

  function handleMythAnswer(btn) {
    const m = myths[mythIndex];
    const userAnswer = btn.dataset.answer === "true";
    const correct = userAnswer === m.answer;
    mythResults[mythIndex] = correct;

    if (correct) mythScore++;

    mythArea.querySelectorAll(".myth-btn").forEach((b) => {
      b.disabled = true;
      const bAnswer = b.dataset.answer === "true";
      if (bAnswer === m.answer) b.classList.add("correct");
      if (b === btn && !correct) b.classList.add("wrong");
    });

    const dots = mythArea.querySelectorAll(".myth-dot");
    dots[mythIndex].classList.remove("current");
    dots[mythIndex].classList.add(correct ? "done-correct" : "done-wrong");

    const feedbackDiv = document.createElement("div");
    feedbackDiv.className = `myth-feedback ${correct ? "success" : "error"}`;
    feedbackDiv.textContent = (correct ? "Correct! " : "Not quite. ") + m.explanation;
    mythArea.appendChild(feedbackDiv);

    const nextBtn = document.createElement("button");
    nextBtn.type = "button";
    nextBtn.className = "myth-next-btn";
    nextBtn.textContent = mythIndex < myths.length - 1 ? "Next Statement" : "See Results";
    nextBtn.addEventListener("click", () => {
      mythIndex++;
      renderMyth();
    });
    mythArea.appendChild(nextBtn);
  }

  function renderMythScore() {
    const pct = Math.round((mythScore / myths.length) * 100);
    let msg = pct === 100 ? "You're a web expert!" :
              pct >= 50  ? "Solid knowledge — you know the web well." :
                           "The web is full of surprises. Keep exploring!";
    mythArea.innerHTML = `
      <div class="myth-score">
        <h4>${mythScore} / ${myths.length} Correct</h4>
        <p>${msg}</p>
        <button type="button" class="myth-restart-btn">Play Again</button>
      </div>
    `;
    mythArea.querySelector(".myth-restart-btn").addEventListener("click", () => {
      mythIndex = 0;
      mythScore = 0;
      mythResults.length = 0;
      renderMyth();
    });
  }

  renderMyth();

  /* ========================================
     CONTACT FORM
     ======================================== */
  const contactForm = document.getElementById("contact-form");
  const formSuccess = document.getElementById("form-success");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    formSuccess.hidden = false;
    contactForm.reset();
    setTimeout(() => {
      formSuccess.hidden = true;
    }, 4000);
  });

  /* ========================================
     KEYBOARD NAVIGATION FOR GAMES
     ======================================== */
  document.addEventListener("keydown", (e) => {
    /* Number keys 1-4 to select bug options */
    const bugPanel = document.getElementById("game-bug");
    if (bugPanel.classList.contains("active")) {
      const options = bugArea.querySelectorAll(".bug-option:not(:disabled)");
      const num = parseInt(e.key);
      if (num >= 1 && num <= options.length) {
        options[num - 1].click();
      }
    }

    /* T/F keys for myths */
    const mythPanel = document.getElementById("game-myths");
    if (mythPanel.classList.contains("active")) {
      const btns = mythArea.querySelectorAll(".myth-btn:not(:disabled)");
      if (btns.length === 2) {
        if (e.key.toLowerCase() === "t") btns[0].click();
        if (e.key.toLowerCase() === "f") btns[1].click();
      }
    }

    /* Enter to advance */
    if (e.key === "Enter") {
      const nextBtn = document.querySelector(".bug-next-btn") ||
                      document.querySelector(".myth-next-btn");
      if (nextBtn) nextBtn.click();
    }
  });

});
