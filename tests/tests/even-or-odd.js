const cases = [
  {
    name: '0',
    desc: '0',
    input: ['0'],
    expect: '0',
  },
  {
    name: '1',
    desc: '1',
    input: ['1'],
    expect: '1',
  },
  {
    name: '2',
    desc: '2',
    input: ['2'],
    expect: '0',
  },
];

for (let i = 0; i < 100; ++i) {
  const rand = (Math.random() * 10) | 0;
  const ans = rand % 2;

  cases.push(
    {
      name: 'rand',
      desc: 'rand',
      input: [String(rand)],
      expect: String(ans),
    }
  );
}

module.exports = {
  cases,
};
