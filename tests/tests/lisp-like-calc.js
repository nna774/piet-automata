// tests.js

const cases = [
  {
    name: '1',
    desc: '',
    input: ['1', '\n'],
    expect: '1',
  },
  {
    name: '2',
    desc: '',
    input: ['2', '\n'],
    expect: '2',
  },
  {
    name: '(+ 1 2)',
    desc: '',
    input: '(+ 1 2)\n'.split(''),
    expect: '3',
  },
  {
    name: '(+ 1 (* 2 (/ 3 2) (- 4 5 (- 6 7 8 9) (+ 0))))',
    desc: '',
    input: '(+ 1 (* 2 (/ 3 2) (- 4 5 (- 6 7 8 9) (+ 0))))\n'.split(''),
    expect: '35',
  },
];

module.exports = {
  cases,
};
