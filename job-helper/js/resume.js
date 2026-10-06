document.addEventListener("DOMContentLoaded", () => {
  const essay = document.getElementById("essay");
  const question = document.getElementById("question");
  const limit = document.getElementById("limit");
  const countWith = document.getElementById("count-with");
  const countWithout = document.getElementById("count-without");
  const countBytes = document.getElementById("count-bytes");
  const limitStatus = document.getElementById("limit-status");
  const counterRow = document.getElementById("counter-row");
  const progressBar = document.getElementById("progress-bar");

  const saved = storage.get("resume-draft", {});
  essay.value = saved.essay || "";
  question.value = saved.question || "";
  limit.value = saved.limit || "";

  // 채용 사이트 기준: 한글 등 비ASCII 2byte, 줄바꿈 2byte, 그 외 1byte
  function byteLength(text) {
    let bytes = 0;
    for (const ch of text) {
      if (ch === "\n") bytes += 2;
      else bytes += ch.charCodeAt(0) > 127 ? 2 : 1;
    }
    return bytes;
  }

  function update() {
    const text = essay.value;
    const withSpaces = [...text].length;
    const withoutSpaces = [...text.replace(/\s/g, "")].length;
    const max = parseInt(limit.value, 10);

    countWith.textContent = withSpaces.toLocaleString();
    countWithout.textContent = withoutSpaces.toLocaleString();
    countBytes.textContent = byteLength(text).toLocaleString();

    if (max > 0) {
      const ratio = withSpaces / max;
      progressBar.style.width = Math.min(ratio * 100, 100) + "%";
      progressBar.style.background =
        ratio > 1 ? "var(--danger)" : ratio >= 0.9 ? "var(--success)" : "var(--primary)";
      counterRow.classList.toggle("over-limit", ratio > 1);
      limitStatus.textContent =
        ratio > 1
          ? `⚠️ ${(withSpaces - max).toLocaleString()}자 초과`
          : `남은 글자 ${(max - withSpaces).toLocaleString()}자 (${Math.round(ratio * 100)}%)`;
    } else {
      progressBar.style.width = "0";
      counterRow.classList.remove("over-limit");
      limitStatus.textContent = "";
    }

    storage.set("resume-draft", {
      essay: essay.value,
      question: question.value,
      limit: limit.value,
    });
  }

  [essay, question, limit].forEach((el) => el.addEventListener("input", update));

  document.getElementById("copy-btn").addEventListener("click", async (e) => {
    try {
      await navigator.clipboard.writeText(essay.value);
    } catch {
      essay.select();
      document.execCommand("copy");
    }
    e.target.textContent = "✅ 복사됨";
    setTimeout(() => (e.target.textContent = "📋 복사하기"), 1500);
  });

  // 실수로 지우는 것을 막기 위해 두 번 눌러야 삭제
  const clearBtn = document.getElementById("clear-btn");
  let clearArmed = false;
  clearBtn.addEventListener("click", () => {
    if (!clearArmed) {
      clearArmed = true;
      clearBtn.textContent = "한 번 더 누르면 삭제";
      setTimeout(() => {
        clearArmed = false;
        clearBtn.textContent = "🗑 지우기";
      }, 2500);
      return;
    }
    essay.value = "";
    clearArmed = false;
    clearBtn.textContent = "🗑 지우기";
    update();
  });

  document.getElementById("star-btn").addEventListener("click", () => {
    const template =
      "[상황] \n\n[과제] \n\n[행동] \n\n[결과] \n";
    essay.value += (essay.value && !essay.value.endsWith("\n") ? "\n\n" : "") + template;
    essay.focus();
    update();
  });

  update();
});
