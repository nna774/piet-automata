// app.js

var opTable = {
    0: { 'filename': 'push', 'length': 1 },
    1: { 'filename': 'pop', 'length': 1 },
    2: { 'filename': 'add', 'length': 1  },
    3: { 'filename': 'sub', 'length': 1  },
    4: { 'filename': 'mul', 'length': 1  },
    5: { 'filename': 'div', 'length': 1  },
    6: { 'filename': 'mod', 'length': 1  },
    7: { 'filename': 'not', 'length': 1  },
    8: { 'filename': 'greater', 'length': 1  },
    9: { 'filename': 'dup', 'length': 1  },
    10: { 'filename': 'roll', 'length': 1  },
    15: { 'filename': 'in_n', 'length': 1  },
    16: { 'filename': 'in_c', 'length': 1  },
    17: { 'filename': 'out_n', 'length': 1  },
    18: { 'filename': 'out_c', 'length': 1  },
    19: { 'filename': 'start', 'length': 1  },
    20: { 'filename': 'terminate', 'length': 1  },
    21: { 'filename': 'jez', 'length': 2  }, // image not exists
    22: { 'filename': 'label', 'length': 1  }, // image not exists

    24: { 'filename': 'black' }, // only use generate
    25: { 'filename': 'branch' },
    26: { 'filename': 'nop_h' },
    27: { 'filename': 'nop_v' },
    28: { 'filename': 'curve5' }, // 上から左
    29: { 'filename': 'curve6' }, // 右から上
    30: { 'filename': 'curve4' }, // 上から右
    31: { 'filename': 'curve7' }, // 左から上
    32: { 'filename': 'cross' },
    33: { 'filename': 'join' },
    34: { 'filename': 'rjoin' },
    35: { 'filename': 'ljoin' },
}

var Canvas = require('canvas')
  , Image = Canvas.Image
  , fs = require('fs')
  , config = require('./config');

function analyze(data) {
    var lines = data.split('\n');
    var code = [];
    for (var l of lines) {
	var m;
	var f = false; var o = l;
	if (m = l.match(/PUSH\s+(\d+)/i)) {
	    code.push([0, parseInt(m[1])]);
	    f = true;
	}
	if (l.match(/POP/i)) {
	    code.push([1]);
	    f = true;
	}
	if (l.match(/ADD/i)) {
	    code.push([2]);
	    f = true;
	}
	if (l.match(/SUB/i)) {
	    code.push([3]);
	    f = true;
	}
	if (l.match(/MUL/i)) {
	    code.push([4]);
	    f = true;
	}
	if (l.match(/DIV/i)) {
	    code.push([5]);
	    f = true;
	}
	if (l.match(/MOD/i)) {
	    code.push([6]);
	    f = true;
	}
	if (l.match(/NOT/i)) {
	    code.push([7]);
	    f = true;
	}
	if (l.match(/GREATER/i)) {
	    code.push([8]);
	    f = true;
	}
	if (l.match(/DUP/i)) {
	    code.push([9]);
	    f = true;
	}
	if (l.match(/ROLL/i)) {
	    code.push([10]);
	    f = true;
	}
	if (l.match(/INN/i)) {
	    code.push([15]);
	    f = true;
	}
	if (l.match(/INC/i)) {
	    code.push([16]);
	    f = true;
	}
	if (l.match(/OUTN/i)) {
	    code.push([17]);
	    f = true;
	}
	if (l.match(/OUTC/i)) {
	    code.push([18]);
	    f = true;
	}
	if (l.match(/HALT/i)) {
	    code.push([20]);
	    f = true;
	}
	if (m = l.match(/JEZ\s+(\w+)/i)) {
	    code.push([21, m[1]]);
	    f = true;
	}
	if (m = l.match(/LABEL\s+(\w+)/i)) {
	    code.push([22, m[1]]);
	    f = true;
	}
	if (l.match(/SUCC/i)) {
	    code.push([33]);
	    f = true;
	}
	if (l.match(/PRED/i)) {
	    code.push([34]);
	    f = true;
	}

	if (!f) {
	    if (! l.match(/(\s*)/)) {
		console.log("unknown token: " + o)
	    }
	}
    }
    return code;
}

function genCodeMap(code) {
    console.log("genCodeMap");
    var newCode = [];
    newCode[0] = [];
    newCode[0].push([19]);
    var labelCount = 0;
    for (c of code) {
	switch (c[0]) {
	case 0:
	    if (c[1] === 1) {
		newCode[0].push(c);
	    } else if (c[1] === 0) {
		newCode[0].push([0, 1]); // push 0 is push 1; not
		newCode[0].push([7]);
	    } else {
		newCode[0].push([0, 1]);
		var i = 1;
		while (i * 2 > c[1]) {
		    i *= 2;
		    newCode[0].push([9]); // DUP
		    newCode[0].push([2]); // ADD
		}
		for (; i < c[1]; ++i) {
		    newCode[0].push([0, 1]);
		    newCode[0].push([2]);
		}
	    }
	    break;
	case 21: // JEZ
	    newCode[0].push([7]);
	    newCode[0].push([21, c[1], labelCount]);
	    ++labelCount;
	    break;
	default:
	    newCode[0].push(c);
	}
    }
    newCode[0].push([20]);
    for (var i = 0; i < labelCount; ++i) {
	newCode.push([]);
	for (var c = 0; c < newCode[0].length; ++c) {
	    newCode[i+1].push([24]);
	}

	// JEZ を探す。
	var j = 0;
	for (j = 0; j < newCode[0].length; ++j) {
	    if (newCode[0][j][0] === 21) {
		if (newCode[0][j][2] === i) {
		    break;
		}
	    }
	}

	if (j == newCode[0].length) {
	    throw("never come");
	}
	var word = newCode[0][j][1];

	var k = 0;
	for (k = 0; k < newCode[0].length; ++k) {
	    if (newCode[0][k][0] === 22) {
		if (newCode[0][k][1] === word) {
		    break;
		}
	    }
	}
	if (k == newCode[0].length) {
	    throw("label " + word + " not found.");
	}

	if (j < k) {// right
	    // 縦
	    for (var l = 1; l <= i; ++l) {
		if (newCode[l][j][0] === 24) { // 黒
		    newCode[l][j][0] = 27; // vnop
		} else {
		    newCode[l][j][0] = 32; // cross
		}
	    }
	    newCode[i+1][j][0] = 30;
	    for (var l = j + 1; l < k; ++l) {
		newCode[i+1][l][0] = 26; // hnop
	    }
	    newCode[i+1][k][0] = 31;
	    for (var l = i; 0 < l; --l) {
		if (newCode[l][k][0] === 24) { // 黒
		    newCode[l][k][0] = 27; // vnop
		} else if (newCode[l][k][0] === 26) { // hnop
		    newCode[l][k][0] = 32; // cross
		} else if (newCode[l][k][0] === 29){
		    newCode[l][k][0] = 34; // rjoin
		    break;
		} else if (newCode[l][k][0] === 31){
		    newCode[l][k][0] = 35; // ljoin
		    break;
		} else {
		    throw ("never come");
		}
	    }
	} else { // left
	    // 縦
	    for (var l = 1; l <= i; ++l) {
		if (newCode[l][j][0] === 24) { // 黒
		    newCode[l][j][0] = 27; // vnop
		} else {
		    newCode[l][j][0] = 32; // cross
		}
	    }
	    newCode[i+1][j][0] = 28;
	    for (var l = k + 1; l < j; ++l) {
		newCode[i+1][l][0] = 26; // hnop
	    }
	    newCode[i+1][k][0] = 29;
	    for (var l = i; 0 < l; --l) {
		if (newCode[l][k][0] === 24) { // 黒
		    newCode[l][k][0] = 27; // vnop
		} else if (newCode[l][k][0] === 26) { // hnop
		    newCode[l][k][0] = 32; // cross
		} else if (newCode[l][k][0] === 29){
		    newCode[l][k][0] = 34; // rjoin
		    break;
		} else if (newCode[l][k][0] === 31){
		    newCode[l][k][0] = 35; // ljoin
		    break;
		} else {
		    throw ("never come");
		}
	    }
	}
    }
    return newCode;
}

function generateImage(code) {
    console.log("generateImage");
    var height = config.unit * code.length;
    var width = config.unit * code[0].length;
    var canvas = new Canvas(width, height);
    var ctx = canvas.getContext('2d');

    ctx.drawImage(config.images['start'].image, 0, 0);

    for (var i = 0; i < code.length; ++i) {
	for (var j = 0; j < code[0].length; ++j) {
	    // コードに対応した画像を挿入する｡
	    var op = opTable[code[i][j][0]];
	    var filename = op['filename']
	    if (filename === 'jez') {
		filename = 'branch';
	    }
	    if (filename === 'label') {
		filename = 'join';
	    }
	    ctx.drawImage(config.images[filename].image, j * config.unit, i * config.unit);
	}
    }

    
    // 以下保存
    var out = fs.createWriteStream('out.png')
    var stream = canvas.pngStream();

    stream.on('data', function(chunk){
	out.write(chunk);
    });

    stream.on('end', function(){
	console.log('saved png');
    });
}

if (process.argv.length < 3) {
    console.log('missing argument.');
    return;
}
var filename = process.argv[2];

for (var k in config.images) {
    var image = new Image();
    image.src = fs.readFileSync(config.images[k].file);
    config.images[k].image = image;
}

fs.readFile(filename, 'utf8', function (err, data) {
    if (err) throw err;
    var code = analyze(data);

    codemap = genCodeMap(code);
    generateImage(codemap);
});
