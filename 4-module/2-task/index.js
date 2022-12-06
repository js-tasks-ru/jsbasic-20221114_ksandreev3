function makeDiagonalRed(table) {
  let rowsLength = table.rows.length;
  let rows = table.rows;

  for (let i = 0; i < rowsLength; i += 1) {
    rows[i].cells[i].style.backgroundColor = "red";
  }
}
