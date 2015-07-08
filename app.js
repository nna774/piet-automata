// app.js

/* 
   0: PUSH n
   1: POP
   2: ADD
   3: SUB
   4: MUL
   5: DIV
   6: MOD
   7: NOT
   8: GRATER
   9: DUP
   10: ROLL
   15: INN
   16: INC
   17: OUTN
   18: OUTC
*/

var Canvas = require('canvas')
  , Image = Canvas.Image
  , fs = require('fs')
  , config = require('./config');

function analyze(data) {
    var lines = data.split('\n');
    var code = [];
    for (var l of lines) {
	var m;
	if (m = l.match(/PUSH\s+(\d+)/i)) {
	    code.push([0, parseInt(m[1])]);
	}
	if (l.match(/POP/i)) {
	    code.push([1]);
	}
	if (l.match(/ADD/i)) {
	    code.push([2]);
	}
	if (l.match(/SUB/i)) {
	    code.push([3]);
	}
	if (l.match(/MUL/i)) {
	    code.push([4]);
	}
	if (l.match(/DIV/i)) {
	    code.push([5]);
	}
	if (l.match(/MOD/i)) {
	    code.push([6]);
	}
	if (l.match(/NOT/i)) {
	    code.push([7]);
	}
	if (l.match(/GREATER/i)) {
	    code.push([8]);
	}
	if (l.match(/DUP/i)) {
	    code.push([9]);
	}
	if (l.match(/ROLL/i)) {
	    code.push([10]);
	}
	if (l.match(/INN/i)) {
	    code.push([15]);
	}
	if (l.match(/INC/i)) {
	    code.push([16]);
	}
	if (l.match(/OUTN/i)) {
	    code.push([17]);
	}
	if (l.match(/OUTC/i)) {
	    code.push([18]);
	}
    }
    return code;
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
	if (c[0] === 0) {
	    ctx.drawImage(config.images['push'].image, width - config.unit, 0);
	}
	if (c[0] === 2) {
	    ctx.drawImage(config.images['add'].image, width - config.unit, 0);
	}
	if (c[0] === 4) {
	    ctx.drawImage(config.images['mul'].image, width - config.unit, 0);
	}
	if (c[0] === 9) {
	    ctx.drawImage(config.images['dup'].image, width - config.unit, 0);
	}
	if (c[0] === 17) {
	    ctx.drawImage(config.images['out_n'].image, width - config.unit, 0);
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

    createPiet(code);
});
