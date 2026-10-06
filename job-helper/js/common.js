// 모든 페이지 공통: 헤더/푸터 렌더링, 모바일 메뉴, localStorage 헬퍼

const NAV_ITEMS = [
  { href: "index.html", label: "홈" },
  { href: "resume.html", label: "자소서 도우미" },
  { href: "interview.html", label: "면접 연습" },
  { href: "tracker.html", label: "지원 현황" },
  { href: "checklist.html", label: "체크리스트" },
];

function renderLayout() {
  const current = location.pathname.split("/").pop() || "index.html";

  const header = document.getElementById("site-header");
  if (header) {
    const links = NAV_ITEMS.map(
      (item) =>
        `<a href="${item.href}"${item.href === current ? ' class="active"' : ""}>${item.label}</a>`
    ).join("");

    header.className = "site-header";
    header.innerHTML = `
      <div class="container">
        <a href="index.html" class="logo">🎯 취준메이트</a>
        <button class="nav-toggle" aria-label="메뉴 열기">☰</button>
        <nav class="nav">${links}</nav>
      </div>`;

    const toggle = header.querySelector(".nav-toggle");
    const nav = header.querySelector(".nav");
    toggle.addEventListener("click", () => nav.classList.toggle("open"));
  }

  const footer = document.getElementById("site-footer");
  if (footer) {
    footer.className = "site-footer";
    footer.innerHTML = `<div class="container">© ${new Date().getFullYear()} 취준메이트 · 모든 데이터는 이 브라우저에만 저장됩니다.</div>`;
  }
}

const storage = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // 저장 불가 환경(시크릿 모드 등)에서는 무시
    }
  },
};

// 오늘 기준 D-day 계산 (dateStr: "YYYY-MM-DD")
function getDday(dateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr + "T00:00:00");
  return Math.round((target - today) / 86400000);
}

function formatDday(diff) {
  if (diff === 0) return "D-Day";
  return diff > 0 ? `D-${diff}` : `D+${-diff}`;
}

document.addEventListener("DOMContentLoaded", renderLayout);
