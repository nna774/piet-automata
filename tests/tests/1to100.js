let res = '';

for (let i = 1; i <= 100; ++i) res += i.toString();

const cases = [
  {
    name: '1 to 100',
    desc: '',
    input: [],
    expect: res,
  },
];

module.exports = {
  cases,
};
