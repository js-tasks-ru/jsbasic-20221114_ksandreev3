function sumSalary(salaries) {
  let sumSalary = 0;
  for (let key in salaries) {
    if (typeof salaries[key] === "number" && Number.isFinite(salaries[key])) {
      sumSalary += salaries[key];
    }
  }
  return sumSalary;
}
