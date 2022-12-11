function toggleText() {
  document
    .querySelector(".toggle-text-button")
    .addEventListener("click", (event) => {
      let textElm = document.getElementById("text");

      textElm.hidden = !textElm.hidden;
    });
}
