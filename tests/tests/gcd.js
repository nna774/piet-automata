var cases = [
    {
	name: '1 2',
	desc: '1 2',
	input: ['1', '2'],
	expect: '1',
    },
    {
	name: '2 1',
	desc: '2 1',
	input: ['2', '1'],
	expect: '1',
    },
    {
	name: '3 5',
	desc: '3 5',
	input: ['3', '5'],
	expect: '1',
    },
    {
	name: '5 3',
	desc: '5 3',
	input: ['5', '3'],
	expect: '1',
    },
    {
	name: '4 8',
	desc: '4 8',
	input: ['4', '8'],
	expect: '4',
    },
    {
	name: '8 4',
	desc: '8 4',
	input: ['8', '4'],
	expect: '4',
    },

];

function gcd(n, m) {
  if (n < m) return gcd(m, n);
  var r = n % m;
  if (r === 0) return m;
  return gcd(m, r);
}

for (var i = 0; i < 100; ++i) {
  var rand1 = (Math.random() * 10000)|0;
  rand1 += 1;
  var rand2 = (Math.random() * 10000)|0;
  rand2 += 1;
  var ans = gcd(rand1, rand2);

  cases.push(
    {
	name: 'rand ' + String(rand1) + ' ' + String(rand2),
	desc: 'rand',
	input: [String(rand1), String(rand2)],
	expect: String(ans),
    }
  );
  cases.push(
    {
	name: 'rand ' + String(rand2) + ' ' + String(rand1),
	desc: 'rand',
	input: [String(rand2), String(rand1)],
	expect: String(ans),
    }
  );
}

module.exports = {
    cases: cases,
};
