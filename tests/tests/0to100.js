let res = '';

for (let i = 0; i <= 100; ++i) res += i.toString();

const cases = [
  {
    name: '0 to 100',
    desc: '',
    input: [],
    expect: res,
  },
];

module.exports = {
  cases,
};
