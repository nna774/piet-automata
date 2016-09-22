let res = '';

for (let i = 100; i <= 200; ++i) res += i.toString();

const cases = [
  {
    name: '100 to 200',
    desc: '',
    input: [],
    expect: res,
  },
];

module.exports = {
  cases,
};
