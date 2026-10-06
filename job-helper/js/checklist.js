document.addEventListener("DOMContentLoaded", () => {
  const groupsEl = document.getElementById("groups");
  const overallText = document.getElementById("overall-text");
  const overallBar = document.getElementById("overall-bar");
  const resetBtn = document.getElementById("reset-btn");

  let checked = storage.get("checklist", {});

  function updateProgress() {
    const done = CHECKLIST_DATA.flatMap((g) => g.items).filter((i) => checked[i.id]).length;
    const pct = Math.round((done / CHECKLIST_TOTAL) * 100);
    overallText.textContent = `${pct}% (${done}/${CHECKLIST_TOTAL})`;
    overallBar.style.width = pct + "%";
    overallBar.style.background = pct === 100 ? "var(--success)" : "var(--primary)";

    CHECKLIST_DATA.forEach((group, gi) => {
      const groupDone = group.items.filter((i) => checked[i.id]).length;
      document.getElementById(`group-count-${gi}`).textContent = `${groupDone}/${group.items.length}`;
    });
  }

  function render() {
    groupsEl.innerHTML = "";
    CHECKLIST_DATA.forEach((group, gi) => {
      const card = document.createElement("section");
      card.className = "card";
      card.style.marginBottom = "0";

      const h2 = document.createElement("h2");
      h2.style.cssText = "display:flex;justify-content:space-between";
      h2.innerHTML = `<span>${group.title}</span><span class="muted" id="group-count-${gi}"></span>`;
      card.appendChild(h2);

      group.items.forEach((item) => {
        const label = document.createElement("label");
        label.className = "check-item" + (checked[item.id] ? " checked" : "");
        const box = document.createElement("input");
        box.type = "checkbox";
        box.checked = !!checked[item.id];
        box.addEventListener("change", () => {
          checked[item.id] = box.checked;
          label.classList.toggle("checked", box.checked);
          storage.set("checklist", checked);
          updateProgress();
        });
        const text = document.createElement("span");
        text.textContent = item.text;
        label.append(box, text);
        card.appendChild(label);
      });

      groupsEl.appendChild(card);
    });
    updateProgress();
  }

  // 실수 방지: 두 번 눌러야 초기화
  let armed = false;
  resetBtn.addEventListener("click", () => {
    if (!armed) {
      armed = true;
      resetBtn.textContent = "한 번 더 누르면 초기화";
      setTimeout(() => {
        armed = false;
        resetBtn.textContent = "초기화";
      }, 2500);
      return;
    }
    armed = false;
    resetBtn.textContent = "초기화";
    checked = {};
    storage.set("checklist", checked);
    render();
  });

  render();
});
