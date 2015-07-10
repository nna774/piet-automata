var rand = (Math.random() * 10)|0;
var ans = rand %2;

var cases = [
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
    {
	name: 'rand',
	desc: 'rand',
	input: [String(rand)],
	expect: String(ans),
    },
];

module.exports = {
    cases: cases,
};
