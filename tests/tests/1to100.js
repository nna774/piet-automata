var res = '';

for(var i = 1; i <= 100; ++i) res = res + i.toString();

var cases = [
    {
	name: '1 to 100',
	desc: '',
	input: [],
	expect: res,
    },
];

module.exports = {
    cases: cases,
};
