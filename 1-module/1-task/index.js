function factorial(n) {
  let a = 1;
  for (let i = 1; i <= n; i++) {
    a = a * i;
  }
  return a;
}

factorial();
