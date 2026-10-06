const QUESTIONS = {
  "기본": [
    "1분 동안 자기소개를 해주세요.",
    "우리 회사에 지원한 동기는 무엇인가요?",
    "본인의 장점과 단점을 말해주세요.",
    "입사 후 포부를 말씀해주세요.",
    "마지막으로 하고 싶은 말이 있나요?",
    "10년 후 본인의 모습은 어떨 것 같나요?",
  ],
  "경험": [
    "가장 힘들었던 경험과 극복 과정을 말해주세요.",
    "팀 프로젝트에서 갈등이 생겼을 때 어떻게 해결했나요?",
    "실패했던 경험과 그로부터 배운 점은 무엇인가요?",
    "리더십을 발휘했던 경험이 있나요?",
    "가장 성취감을 느꼈던 경험은 무엇인가요?",
    "주도적으로 무언가를 개선한 경험이 있나요?",
  ],
  "직무": [
    "이 직무에 필요한 역량은 무엇이라고 생각하나요?",
    "해당 직무를 위해 어떤 준비를 해왔나요?",
    "우리 회사의 제품/서비스에 대해 아는 대로 말해주세요.",
    "입사하면 가장 먼저 해보고 싶은 업무는 무엇인가요?",
    "업계의 최근 트렌드에 대해 어떻게 생각하나요?",
  ],
  "인성": [
    "스트레스를 어떻게 관리하나요?",
    "상사와 의견이 다를 때 어떻게 하겠습니까?",
    "원하지 않는 부서에 배치되면 어떻게 하겠습니까?",
    "주변 사람들은 당신을 어떻게 평가하나요?",
    "직장 생활에서 가장 중요하게 생각하는 가치는 무엇인가요?",
  ],
};

document.addEventListener("DOMContentLoaded", () => {
  const categoriesEl = document.getElementById("categories");
  const questionEl = document.getElementById("question");
  const timerEl = document.getElementById("timer");
  const startBtn = document.getElementById("start-btn");
  const memoEl = document.getElementById("memo");
  const historyEl = document.getElementById("history");

  let category = "전체";
  let currentQuestion = "";
  let duration = 60;
  let remaining = duration;
  let intervalId = null;

  // 카테고리 칩
  ["전체", ...Object.keys(QUESTIONS)].forEach((name) => {
    const chip = document.createElement("button");
    chip.className = "chip" + (name === category ? " active" : "");
    chip.textContent = name;
    chip.addEventListener("click", () => {
      category = name;
      categoriesEl.querySelectorAll(".chip").forEach((c) => c.classList.toggle("active", c === chip));
    });
    categoriesEl.appendChild(chip);
  });

  document.getElementById("draw-btn").addEventListener("click", () => {
    const pool = category === "전체" ? Object.values(QUESTIONS).flat() : QUESTIONS[category];
    let next;
    do {
      next = pool[Math.floor(Math.random() * pool.length)];
    } while (pool.length > 1 && next === currentQuestion);
    currentQuestion = next;
    questionEl.textContent = next;
    resetTimer();
  });

  // 타이머
  function renderTimer() {
    const m = String(Math.floor(remaining / 60)).padStart(2, "0");
    const s = String(remaining % 60).padStart(2, "0");
    timerEl.textContent = `${m}:${s}`;
    timerEl.classList.toggle("warning", remaining > 0 && remaining <= 10);
    timerEl.classList.toggle("done", remaining === 0);
  }

  function stopTimer() {
    clearInterval(intervalId);
    intervalId = null;
    startBtn.textContent = "▶ 시작";
  }

  function resetTimer() {
    stopTimer();
    remaining = duration;
    renderTimer();
  }

  startBtn.addEventListener("click", () => {
    if (intervalId) {
      stopTimer();
      startBtn.textContent = "▶ 계속";
      return;
    }
    if (remaining === 0) remaining = duration;
    startBtn.textContent = "⏸ 일시정지";
    intervalId = setInterval(() => {
      remaining--;
      renderTimer();
      if (remaining === 0) {
        stopTimer();
        timerEl.textContent = "시간 종료!";
      }
    }, 1000);
  });

  document.getElementById("reset-btn").addEventListener("click", resetTimer);

  document.getElementById("durations").addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    duration = Number(chip.dataset.sec);
    document.querySelectorAll("#durations .chip").forEach((c) => c.classList.toggle("active", c === chip));
    resetTimer();
  });

  // 연습 기록
  function renderHistory() {
    const history = storage.get("interview-history", []);
    document.getElementById("history-count").textContent = `(${history.length}개)`;
    historyEl.innerHTML = "";
    if (history.length === 0) {
      historyEl.innerHTML = '<li class="muted">아직 저장된 기록이 없어요.</li>';
      return;
    }
    history.forEach((item, i) => {
      const li = document.createElement("li");
      const q = document.createElement("strong");
      q.textContent = "Q. " + item.question;
      const memo = document.createElement("div");
      memo.className = "muted";
      memo.textContent = item.memo;
      memo.style.whiteSpace = "pre-wrap";
      const meta = document.createElement("div");
      meta.style.cssText = "display:flex;justify-content:space-between;align-items:center;font-size:0.8rem;margin-top:4px";
      meta.innerHTML = `<span class="muted">${item.date}</span>`;
      const del = document.createElement("button");
      del.className = "btn btn-outline btn-sm";
      del.textContent = "삭제";
      del.addEventListener("click", () => {
        history.splice(i, 1);
        storage.set("interview-history", history);
        renderHistory();
      });
      meta.appendChild(del);
      li.append(q, memo, meta);
      historyEl.appendChild(li);
    });
  }

  document.getElementById("save-memo").addEventListener("click", () => {
    if (!currentQuestion) {
      questionEl.textContent = "먼저 질문을 뽑아주세요!";
      return;
    }
    if (!memoEl.value.trim()) {
      memoEl.focus();
      return;
    }
    const history = storage.get("interview-history", []);
    history.unshift({
      question: currentQuestion,
      memo: memoEl.value.trim(),
      date: new Date().toLocaleString("ko-KR"),
    });
    storage.set("interview-history", history);
    memoEl.value = "";
    renderHistory();
  });

  renderTimer();
  renderHistory();
});
