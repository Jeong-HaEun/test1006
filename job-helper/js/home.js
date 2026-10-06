const QUOTES = [
  "늦었다고 생각할 때가 가장 빠른 때입니다. 오늘 한 걸음이면 충분해요.",
  "탈락은 실패가 아니라, 나에게 더 맞는 자리를 찾아가는 과정입니다.",
  "완벽한 자소서보다 제출한 자소서가 더 가치 있습니다.",
  "비교는 어제의 나와만 하세요.",
  "준비된 사람에게 기회는 반드시 옵니다.",
  "면접관도 당신이 잘 되길 바라는 사람입니다. 긴장하지 마세요.",
  "작은 성취를 기록하세요. 그게 쌓여 자신감이 됩니다.",
];

document.addEventListener("DOMContentLoaded", () => {
  // 날짜 기준으로 매일 같은 문구가 나오도록
  const dayIndex = Math.floor(Date.now() / 86400000) % QUOTES.length;
  document.getElementById("daily-quote").textContent = `"${QUOTES[dayIndex]}"`;

  const apps = storage.get("jobs", []);
  const upcoming = apps.filter((a) => {
    const d = getDday(a.deadline);
    return d >= 0 && d <= 7 && a.status === "준비 중";
  });
  const passed = apps.filter((a) => ["서류 합격", "면접 진행", "최종 합격"].includes(a.status));

  document.getElementById("stat-applied").textContent = apps.length;
  document.getElementById("stat-upcoming").textContent = upcoming.length;
  document.getElementById("stat-passed").textContent = passed.length;

  const checked = storage.get("checklist", {});
  const done = Object.values(checked).filter(Boolean).length;
  document.getElementById("stat-checklist").textContent =
    Math.round((done / CHECKLIST_TOTAL) * 100) + "%";
});
