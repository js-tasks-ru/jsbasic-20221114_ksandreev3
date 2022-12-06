function highlight(table) {
  for (let row of table.tBodies[0].rows) {
    let available = row.cells[3].dataset.available;
    if (available) {
      row.classList.add(available === "true" ? "available" : "unavailable");
    } else {
      row.hidden = true;
    }

    let gender = row.cells[2].innerHTML;
    if (gender === "m") {
      row.classList.add("male");
    }
    if (gender === "f") {
      row.classList.add("female");
    }

    let age = row.cells[1].innerHTML;
    if (age < 18) {
      row.style.textDecoration = "line-through";
    }
  }
}
