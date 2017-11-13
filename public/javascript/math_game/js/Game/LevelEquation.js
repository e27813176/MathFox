export const equationlevel1 = range => {
  let equation = [];
  equation[0] = Math.floor(Math.random() * 9) + 1;
  equation[1] = Math.floor(Math.random() * 2) + 1;
  equation[2] = equation[0] + equation[1];
  while (equation[2] < range[0] || equation[2] > range[1]) {
    return equationlevel1(range)
  }
  return equation;
};

export const equationlevel2 = range => {
  let equation = [];
  equation[2] = Math.floor(Math.random() * 9) + 1;
  equation[0] = Math.floor(Math.random() * 2) + 1;
  equation[1] = equation[2] - equation[0];
  while (equation[1] < range[0] || equation[1] > range[1]) {
    return equationlevel2(range)
  }
  return equation
};

export const equationlevel3 = range => {
  let equation = [];
  equation[0] = Math.floor(Math.random() * 9) + 1;
  equation[1] = Math.floor(Math.random() * 9) + 1;
  equation[2] = equation[0] + equation[1];
  while (equation[2] < range[0] || equation[2] > range[1]) {
    return equationlevel3(range)
  }
  return equation
};

export const equationlevel4 = range => {
  let equation = [];
  equation[2] = Math.floor(Math.random() * 9) + 1;
  equation[0] = Math.floor(Math.random() * 8) + 1;
  equation[1] = equation[2] - equation[0];
  while (equation[1] < range[0] || equation[1] > range[1]) {
    return equationlevel4(range)
  }
  return equation
};

export const equationlevel5 = range => {
  let equation = [];
  let offset = range[0] - 11;
  let rand = Math.floor(Math.random() * 2) + 1;
  switch (rand) {
    case 1:
      equation[0] = Math.floor(Math.random() * 5) + 1 + offset;
      equation[1] = 10;
      break;
    case 2:
      equation[0] = 10;
      equation[1] = Math.floor(Math.random() * 5) + 1 + offset;
      break;
  }
  equation[2] = equation[0] + equation[1];
  return equation
};
export const equationlevel7 = () => {
  let equation = [];
  equation[0] = Math.floor(Math.random() * 10) + 1;
  equation[1] = equation[0];
  equation[2] = equation[0] + equation[1];
  return equation
};
export const equationlevel9 = () => {
  let equation = [];
  equation[0] = Math.floor(Math.random() * 10) + 1;
  equation[1] = Math.floor(Math.random() * 10) + 1;
  equation[2] = equation[0] + equation[1];
  return equation
};

export const equationlevel10 = () => {
  let equation = [];
  equation[2] = Math.floor(Math.random() * 8) + 11;
  equation[0] = Math.floor(Math.random() * 9) + 1;
  equation[1] = equation[2] + equation[0];
  return equation
};
