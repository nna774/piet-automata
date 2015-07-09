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

    20: { 'filename': 'terminate', 'length': 1  },
    21: { 'filename': 'jez', 'length': 2  }, // image not exists
    22: { 'filename': 'label', 'length': 1  }, // image not exists

    // 以下拡張命令
    33: { 'filename': 'succ', 'length': 1  }, // image not exists
    34: { 'filename': 'pred', 'length': 1  }, // image not exists
    35: { 'filename': '', 'length': 1  },
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
    var newCode = [];
    for (c of code) {
	switch (c[0]) {
	case 0:
	    if (c[1] !== 1) {
		newCode.push([0, 0]);
		for (var i = 0; i < c[1]; ++i) {
		    newCode.push([0, 1]);
		    newCode.push([2]);
		}
	    } else {
		newCode.push(c);
	    }
	    break;
	case 33:
	    newCode.push([0, 1]);
	    newCode.push([2]);
	    break;
	case 34:
	    newCode.push([0, 1]);
	    newCode.push([3]);
	    break;
	default:
	    newCode.push(c);
	}
    }
    return newCode;
}

function generateImage(code) {
    var height = config.unit;
    var width = config.unit;
    var canvas = new Canvas(width, height);
    var ctx = canvas.getContext('2d');

    ctx.drawImage(config.images['start'].image, 0, 0);

    for (var c of code) { // 毎回画像の更新してるの効率悪そう｡
	var image = ctx.getImageData(0, 0, width, height);
	width += config.unit;
	var newCanvas = new Canvas(width, height);
	var newCtx = newCanvas.getContext('2d');
	newCtx.putImageData(image, 0, 0)
	canvas = newCanvas;
	ctx = newCtx;

	// コードに対応した画像を挿入する｡
	if (true) { // なにも考えずに挿入すれば動く命令｡
	    var op = table[c[0]];
	    ctx.drawImage(config.images[op].image, width - config.unit, 0);
	}
    }

    // terminate
    var image = ctx.getImageData(0, 0, width, height);
    width += config.unit;
    var newCanvas = new Canvas(width, height);
    var newCtx = newCanvas.getContext('2d');
    newCtx.putImageData(image, 0, 0)
    canvas = newCanvas;
    ctx = newCtx;
    ctx.drawImage(config.images['terminate'].image, width - config.unit, 0);
    
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

    codemap = genCodeMap(code);p
    generateImage(codemap);
});
