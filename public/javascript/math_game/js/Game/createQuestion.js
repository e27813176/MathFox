const equationList = [];

export const createQuestionNum = (level, Range) => {
  let List = equationList;
  let index = equationList.length - 1;
  let equation = level(Range);
  if (index >= 0) {
    while (equation[0] === List[index][0] && equation[1] === List[index][1]) {
      equation = level(Range);
    }
  }
  equationList.push(equation);
  return equation;
};
