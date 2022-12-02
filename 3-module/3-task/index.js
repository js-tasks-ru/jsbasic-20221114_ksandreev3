function camelize(str) {
  let arr = str.split("-");
  arr.forEach((item) => {
    arr[arr.indexOf(item)] =
      item.charAt(0).toUpperCase() + item.slice(1, item.length);
  });
  str = arr.join("");
  return str.charAt(0).toLowerCase() + str.slice(1, str.length);
}

camelize();
