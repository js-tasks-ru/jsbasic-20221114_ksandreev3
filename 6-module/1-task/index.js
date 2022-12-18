export default class UserTable {
  constructor(rows) {
    this.elem = document.createElement("table");
    this.elem.innerHTML = this.render(rows);
    this.elem.addEventListener("click", this.onClick);
  }
  render(rows) {
    let thead =
      "<tr>" +
      ["Имя", "Возраст", "Зарплата", "Город", ""]
        .map((td) => `<th>${td}</th>`)
        .join("") +
      "</tr>";

    rows = rows
      .map(
        ({ name, age, salary, city }) => `
        <tr>
          <td>${name}</td>
          <td>${age}</td>
          <td>${salary}</td>
          <td>${city}</td>
          <td><button click = "onClick()">X</button></td>
        </tr>
      `
      )
      .join("");

    return `<thead>${thead}<thead><tbody>${rows}</tbody>`;
  }

  onClick(event) {
    let btn = event.target.closest("button");
    if (btn) {
      event.target.closest("tr").remove();
    }
  }
}
