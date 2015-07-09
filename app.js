// app.js

var table = {
    0: 'push',
    1: 'pop',
    2: 'add',
    3: 'sub',
    4: 'mul',
    5: 'div',
    6: 'mod',
    7: 'not',
    8: 'greater',
    9: 'dup',
    10: 'roll',
    15: 'in_n',
    16: 'in_c',
    17: 'out_n',
    18: 'out_c',

    // 以下拡張命令
    33: 'succ',
    34: 'pred',
    35: ''
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

function prepro(code) {
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

function createPiet(code) {
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

    code = prepro(code);
    createPiet(code);
});
