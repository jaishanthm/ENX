/**
 * Mitsuha SnowAngel (mitsuhasnowangel1) - Pure Static Cyber-Frost Engine
 */

document.addEventListener("DOMContentLoaded", () => {
  initSnowCanvas();
  initTypewriter();
  initNavigation();
  initResumeHint();
  initCyberTerminal();
  initContactForm();
});

/* ==========================================================================
   1. Dynamic Snowflake Particle Canvas (Pure Static Vanilla JS)
   ========================================================================== */
let snowActive = true;

function initSnowCanvas() {
  const canvas = document.getElementById("snow-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const flakeCount = Math.floor((width * height) / 10000);
  const flakes = [];

  for (let i = 0; i < flakeCount; i++) {
    flakes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.2 + 0.8,
      speedY: Math.random() * 1.0 + 0.4,
      speedX: Math.random() * 0.6 - 0.3,
      opacity: Math.random() * 0.7 + 0.25,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.02 + 0.01,
    });
  }

  let mouseX = -1000;
  let mouseY = -1000;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function render() {
    ctx.clearRect(0, 0, width, height);

    if (snowActive) {
      ctx.fillStyle = "#ffffff";

      for (let i = 0; i < flakes.length; i++) {
        const f = flakes[i];
        f.wobble += f.wobbleSpeed;
        f.y += f.speedY;
        f.x += f.speedX + Math.sin(f.wobble) * 0.35;

        // Subtle interactive mouse deflection
        const dx = f.x - mouseX;
        const dy = f.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          const force = (100 - dist) / 100;
          f.x += (dx / dist) * force * 1.5;
        }

        // Wrap around bounds
        if (f.y > height) {
          f.y = -5;
          f.x = Math.random() * width;
        }
        if (f.x > width) f.x = 0;
        if (f.x < 0) f.x = width;

        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(224, 242, 254, ${f.opacity})`;
        ctx.fill();
      }
    }

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);

  // Snow toggle button
  const toggleBtn = document.getElementById("toggle-snow-btn");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      snowActive = !snowActive;
      toggleBtn.classList.toggle("active", snowActive);
      showToast(snowActive ? "❄️ Snow animation enabled" : "❄️ Snow animation paused");
    });
  }
}

/* ==========================================================================
   2. Hero Typing Effect
   ========================================================================== */
function initTypewriter() {
  const el = document.getElementById("typed-text");
  if (!el) return;

  const roles = [
    "Offensive Security Researcher",
    "Bug Bounty Hunter (Top 1% Global)",
    "EnigmaX CTF 2026 Champion",
    "Application Security Engineer",
    "SnowAngel Recon Suite Creator",
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typeSpeed = 80;

  function type() {
    const current = roles[roleIdx];

    if (isDeleting) {
      el.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      typeSpeed = 40;
    } else {
      el.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      typeSpeed = 80;
    }

    if (!isDeleting && charIdx === current.length) {
      typeSpeed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typeSpeed = 400;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* ==========================================================================
   3. Navigation & Smooth Scroll Spy
   ========================================================================== */
function initNavigation() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  const mobileToggle = document.querySelector(".mobile-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      navMenu.classList.toggle("open");
    });

    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
      });
    });
  }

  window.addEventListener("scroll", () => {
    let current = "";
    const scrollPos = window.pageYOffset + 120;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

/* ==========================================================================
   4. Resume Click -> Advanced Google Search Hint Modal & Toast
   ========================================================================== */
function initResumeHint() {
  const resumeTriggers = document.querySelectorAll(".btn-resume-hint");
  const modal = document.getElementById("resume-hint-modal");
  const closeBtn = document.getElementById("hint-modal-close");
  const closeBtn2 = document.getElementById("hint-modal-close-btn");
  const copyHintBtn = document.getElementById("btn-copy-hint");

  const HINT_TEXT = "use advanced google search to find my resume";

  function openHintModal(e) {
    if (e) e.preventDefault();
    if (modal) {
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
    showToast("💡 Hint: use advanced google search to find my resume");
  }

  function closeHintModal() {
    if (modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  // Attach hint to all resume triggers
  resumeTriggers.forEach((trigger) => {
    trigger.addEventListener("click", openHintModal);
  });

  if (closeBtn) closeBtn.addEventListener("click", closeHintModal);
  if (closeBtn2) closeBtn2.addEventListener("click", closeHintModal);

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeHintModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && modal.classList.contains("active")) {
      closeHintModal();
    }
  });

  // Copy hint text
  if (copyHintBtn) {
    copyHintBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(HINT_TEXT).then(() => {
        showToast("📋 Hint copied to clipboard!");
      }).catch(() => {
        showToast("💡 Hint: " + HINT_TEXT);
      });
    });
  }
}

function showToast(message) {
  let toast = document.getElementById("toast-notification");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast-notification";
    toast.className = "toast";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 4000);
}

/* ==========================================================================
   5. Pure Static Cyber Terminal
   ========================================================================== */
function initCyberTerminal() {
  const input = document.getElementById("terminal-input");
  const output = document.getElementById("terminal-output");
  if (!input || !output) return;

  const commands = {
    help: `Available commands:
  • whoami     - Display researcher dossier
  • resume     - Request resume access & search hint
  • cat resume - Inspect resume contents
  • flag       - Flag retrieval status
  • skills     - Print core offensive capabilities
  • projects   - List active research & open source tools
  • snow       - Toggle particle atmospheric snow
  • clear      - Clear terminal screen
  • contact    - Display secure transmission channels`,

    whoami: `Mitsuha SnowAngel (@mitsuhasnowangel1)
Role: Senior Application Security Engineer & Offensive Security Researcher
Specialization: Web Exploitation, Reverse Engineering, DevSecOps
CTF Team: FrostByte (Captain)
Ranking: Top 1% HackerOne & Bugcrowd`,

    resume: `[🔒] DIRECT ACCESS RESTRICTED: Resume is archived in the web index.
[💡] HINT: use advanced google search to find my resume`,

    "cat resume": `[🔒] DIRECT ACCESS RESTRICTED: Resume is archived in the web index.
[💡] HINT: use advanced google search to find my resume`,

    flag: `[🔒] Flag Status: ENCRYPTED IN RESUME.
[💡] HINT: use advanced google search to find my resume
[★] Once you obtain the PDF resume, extract the flag token inside!`,

    skills: `OFFENSIVE SECURITY:
  - OWASP Top 10, SSRF, IDOR, GraphQL & REST Exploitation
  - Burp Suite Pro, Ghidra, Frida, Nuclei, Wireshark, Metasploit
LANGUAGES & RUNTIMES:
  - Python, Go, Rust, TypeScript, Bash, C/C++, SQL
DEFENSIVE ARCHITECTURE:
  - AWS/GCP IAM Security, Kubernetes Hardening, CI/CD Pipeline SAST/DAST`,

    projects: `1. SnowAngel Recon Suite (Go/Python) - High-speed automated asset discovery
2. Kimi-Guard (Rust/WASM) - Inline API threat mitigation & WAF proxy
3. VulnRadar (Python) - Heuristic vulnerability detection engine
4. FrostByte CTF Challenges - Curated security puzzles and pwn boxes`,

    contact: `Email:    mitsuha.snowangel@proton.me
GitHub:   github.com/mitsuhasnowangel1
PGP Key:  3F8A 9D42 B1E6 74CA 890F`,

    snow: () => {
      snowActive = !snowActive;
      return snowActive ? "❄️ Snow effect ENABLED." : "❄️ Snow effect PAUSED.";
    },

    clear: () => {
      output.innerHTML = "";
      return null;
    },
  };

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const val = input.value.trim().toLowerCase();
      input.value = "";

      if (!val) return;

      const cmdRow = document.createElement("div");
      cmdRow.innerHTML = `<span style="color:#38bdf8;">visitor@snowangel:~$</span> ${escapeHtml(val)}`;
      output.appendChild(cmdRow);

      let response = "";
      if (commands[val]) {
        if (typeof commands[val] === "function") {
          response = commands[val]();
        } else {
          response = commands[val];
        }
      } else {
        response = `bash: command not found: ${escapeHtml(val)}. Type "help" for a list of available commands.`;
      }

      if (response !== null) {
        const resRow = document.createElement("pre");
        resRow.style.color = "#94a3b8";
        resRow.style.margin = "0.3rem 0 0.8rem 0";
        resRow.style.fontFamily = "inherit";
        resRow.style.whiteSpace = "pre-wrap";
        resRow.textContent = response;
        output.appendChild(resRow);
      }

      const container = document.querySelector(".terminal-content");
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }
  });

  function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
}

/* ==========================================================================
   6. Pure Static Contact Form (Simulated Client-Side Transmission)
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = form.querySelector("button[type='submit']");
    const originalText = btn.innerHTML;

    btn.disabled = true;
    btn.innerHTML = `<span>Transmitting securely...</span>`;

    setTimeout(() => {
      btn.innerHTML = `<span>✓ Transmission Received</span>`;
      btn.style.background = "#22c55e";
      showToast("🔐 Transmission received locally! Contact: mitsuha.snowangel@proton.me");
      form.reset();

      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = originalText;
        btn.style.background = "";
      }, 3500);
    }, 1000);
  });
}
