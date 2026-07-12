export function checkValueAccurInStr(str, letter) {
  let counter = 0;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === letter) {
      counter += 1;
    }
  }

  return counter;
}

export function checkValueAccurInStr2(str, letter, count) {
  let counter = 0;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === letter) {
      counter += 1;
    }
  }

  return counter === count;
}

export const objectToTest = {
  fetch() {
    return [1, 2, 3]; //real fetch
  },
  decorateFetchedList() {
    const input = this.fetch();
    return input.map((value) => `*${value}*`);
  },
};
