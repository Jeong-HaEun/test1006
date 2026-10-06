const STATUSES = {
  "준비 중": { bg: "#f1f3f5", color: "#495057" },
  "지원 완료": { bg: "#e7f5ff", color: "#1971c2" },
  "서류 합격": { bg: "#fff4e6", color: "#e8590c" },
  "면접 진행": { bg: "#f3f0ff", color: "#6741d9" },
  "최종 합격": { bg: "#ebfbee", color: "#2f9e44" },
  "불합격": { bg: "#fff5f5", color: "#e03131" },
};

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("job-form");
  const statusSelect = document.getElementById("status");
  const listEl = document.getElementById("job-list");
  const emptyEl = document.getElementById("empty");
  const filtersEl = document.getElementById("filters");

  let jobs = storage.get("jobs", []);
  let filter = "전체";

  Object.keys(STATUSES).forEach((s) => statusSelect.add(new Option(s, s)));

  function save() {
    storage.set("jobs", jobs);
  }

  function renderFilters() {
    filtersEl.innerHTML = "";
    ["전체", ...Object.keys(STATUSES)].forEach((name) => {
      const count = name === "전체" ? jobs.length : jobs.filter((j) => j.status === name).length;
      const chip = document.createElement("button");
      chip.className = "chip" + (name === filter ? " active" : "");
      chip.textContent = `${name} ${count}`;
      chip.addEventListener("click", () => {
        filter = name;
        render();
      });
      filtersEl.appendChild(chip);
    });
  }

  function render() {
    renderFilters();
    listEl.innerHTML = "";

    const visible = jobs
      .filter((j) => filter === "전체" || j.status === filter)
      .sort((a, b) => a.deadline.localeCompare(b.deadline));

    emptyEl.style.display = visible.length ? "none" : "block";
    emptyEl.textContent = jobs.length
      ? "해당 상태의 지원 내역이 없어요."
      : "등록된 지원 내역이 없어요. 위에서 추가해보세요!";

    visible.forEach((job) => {
      const tr = document.createElement("tr");
      const diff = getDday(job.deadline);

      const ddayTd = document.createElement("td");
      ddayTd.textContent = formatDday(diff);
      if (diff < 0) ddayTd.className = "dday-past";
      else if (diff <= 3) ddayTd.className = "dday-urgent";

      const companyTd = document.createElement("td");
      companyTd.textContent = job.company;
      companyTd.style.fontWeight = "600";

      const positionTd = document.createElement("td");
      positionTd.textContent = job.position;

      const deadlineTd = document.createElement("td");
      deadlineTd.textContent = job.deadline;

      const statusTd = document.createElement("td");
      const select = document.createElement("select");
      Object.keys(STATUSES).forEach((s) => select.add(new Option(s, s, false, s === job.status)));
      const style = STATUSES[job.status];
      select.style.cssText = `width:auto;padding:4px 8px;border-radius:99px;font-size:0.82rem;font-weight:600;background:${style.bg};color:${style.color};border-color:transparent`;
      select.addEventListener("change", () => {
        job.status = select.value;
        save();
        render();
      });
      statusTd.appendChild(select);

      const actionTd = document.createElement("td");
      const del = document.createElement("button");
      del.className = "btn btn-outline btn-sm";
      del.textContent = "삭제";
      del.addEventListener("click", () => {
        jobs = jobs.filter((j) => j.id !== job.id);
        save();
        render();
      });
      actionTd.appendChild(del);

      tr.append(ddayTd, companyTd, positionTd, deadlineTd, statusTd, actionTd);
      listEl.appendChild(tr);
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    jobs.push({
      id: Date.now(),
      company: document.getElementById("company").value.trim(),
      position: document.getElementById("position").value.trim(),
      deadline: document.getElementById("deadline").value,
      status: statusSelect.value,
    });
    save();
    form.reset();
    render();
  });

  render();
});
