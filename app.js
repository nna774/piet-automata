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
  23: { 'filename': 'jmp', 'length': 1  }, // image not exists

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
  36: { 'filename': 'curve1' }, // 左から下

  40: { 'filename': 'push0' },
  41: { 'filename': 'push2' },
  42: { 'filename': 'push16' },
  43: { 'filename': 'push32' },

  46: { 'filename': 'dupadd' },
  47: { 'filename': 'dupmul' },
  48: { 'filename': 'notbranch' },
  49: { 'filename': 'swap' },
};

const OP = {
  push: 0,
  pop: 1,
  add: 2,
  sub: 3,
  mul: 4,
  div: 5,
  mod: 6,
  not: 7,
  greater: 8,
  dup: 9,
  roll: 10,
  in_n: 15,
  in_c: 16,
  out_n: 17,
  out_c: 18,
  start: 19,
  terminate: 20,
  jez: 21,
  label: 22,
  jmp: 23,
  black: 24,
  branch: 25,
  nop_h: 26,
  nop_v: 27,
  up2left: 28,
  right2up: 29,
  up2right: 30,
  left2up: 31,
  cross: 32,
  join: 33,
  rjoin: 34,
  ljoin: 35,
  left2down: 36,
  push0: 40,
  push2: 41,
  push16: 42,
  push32: 43,
  dupadd: 46,
  dupmul: 47,
  notbranch: 48,
  swap: 49,
};

var Canvas = require('canvas')
  , Image = Canvas.Image
  , fs = require('fs')
  , config = require('./config');

function analyze(data) {
  'use strict';
  var lines = data.split('\n');
  var code = [];
  for (var l of lines) {
    var m;
    var f = false;
    if ((m = l.match(/^\s*PUSH\s+(\d+)/i))) {
      code.push({ op: OP.push, val: parseInt(m[1]) });
      f = true;
    }
    if (l.match(/^\s*POP/i)) {
      code.push({ op: OP.pop });
      f = true;
    }
    if (l.match(/^\s*ADD/i)) {
      code.push({ op: OP.add });
      f = true;
    }
    if (l.match(/^\s*SUB/i)) {
      code.push({ op: OP.sub });
      f = true;
    }
    if (l.match(/^\s*MUL/i)) {
      code.push({ op: OP.mul });
      f = true;
    }
    if (l.match(/^\s*DIV/i)) {
      code.push({ op: OP.div });
      f = true;
    }
    if (l.match(/^\s*MOD/i)) {
      code.push({ op: OP.mod });
      f = true;
    }
    if (l.match(/^\s*NOT/i)) {
      code.push({ op: OP.not });
      f = true;
    }
    if (l.match(/^\s*GREATER/i)) {
      code.push({ op: OP.greater });
      f = true;
    }
    if (l.match(/^\s*DUP/i)) {
      code.push({ op: OP.dup });
      f = true;
    }
    if (l.match(/^\s*ROLL/i)) {
      code.push({ op: OP.roll });
      f = true;
    }
    if (l.match(/^\s*INN/i)) {
      code.push({ op: OP.in_n });
      f = true;
    }
    if (l.match(/^\s*INC/i)) {
      code.push({ op: OP.in_c });
      f = true;
    }
    if (l.match(/^\s*OUTN/i)) {
      code.push({ op: OP.out_n });
      f = true;
    }
    if (l.match(/^\s*OUTC/i)) {
      code.push({ op: OP.out_c });
      f = true;
    }
    if (l.match(/^\s*HALT/i)) {
      code.push({ op: OP.terminate });
      f = true;
    }
    if ((m = l.match(/^\s*JEZ\s+(\w+)/i))) {
      code.push({ op: OP.jez, label: m[1] });
      f = true;
    }
    if ((m = l.match(/^\s*LABEL\s+(\w+)/i))) {
      code.push({ op: OP.label, word: m[1] });
      f = true;
    }
    if ((m = l.match(/^\s*JMP\s+(\w+)/i))) {
      code.push({ op: OP.jmp, label: m[1] });
      f = true;
    }
    if (l.match(/^\s*SWAP/i)) {
      var funs = {
        7: function(c) { c.push({ op: OP.swap }); },
        5: function(c) {
          c.push({ op: OP.push, val: 2 });
          c.push({ op: OP.push, val: 1 });
          c.push({ op: OP.roll });
        },
      };
      sizedPush(funs, code);
      f = true;
    }

    if (l.match(/(^#.*$|\s*)/i)) {
      // コメント or 空行
      f = true;
    }

    if (!f) {
      console.log("unknown token: " + l);
    }
  }
  return code;
}

function isJump(opCode) {
  'use strict';
  if (opCode.jump === true) return true;
  return false;
}

function sizedPush(funs, list) {
  'use strict';
  var fun = funs[config.unit];
  if (!fun) throw "never come!(unknown unit size)";
  fun(list);
}

function opPush(newCode, c) {
  'use strict';
  if (c.val === 0) {
    newCode[0].push({ op: OP.push0 });
  } else if (c.val === 1) {
    newCode[0].push(c);
  } else if (c.val === 2) {
    newCode[0].push({ op: OP.push2 });
  } else {
    newCode[0].push({ op: OP.push0 });
    var sum = 0;
    var tar = c.val;
    while (tar !== sum) {
      if (tar === sum + 1) {
        newCode[0].push({ op: OP.push, val: 1 });
        newCode[0].push({ op: OP.add });
        sum += d;
        break;
      } else {
        var d = 2;
        if (config.unit === 7) {
          if (sum + 32 < tar) {
            d = 32;
            newCode[0].push({ op: OP.push32 });
          } else if (sum + 16 < tar) {
            d = 16;
            newCode[0].push({ op: OP.push16 });
          } else {
            newCode[0].push({ op: OP.push2 });
          }
        } else if (config.unit === 5) {
          newCode[0].push({ op: OP.push2 });
        } else {
          throw "never come!(unknown unit size)";
        }
        while (true) {
          if (d * d + sum < tar) {
            newCode[0].push({ op: OP.dupmul });
            d *= d;
          } else if (d * 2 + sum < tar) {
            newCode[0].push({ op: OP.dupadd });
            d *= 2;
          } else {
            newCode[0].push({ op: OP.add });
            sum += d;
            break;
          }
        }
      }
    }
  }
}

function genCodeChain(code) {
  'use strict';
  console.log("genCodeChain");
  var newCode = [];
  newCode[0] = [];
  newCode[0].push({ op: OP.start });
  var labelCount = 0;
  for (var c of code) {
    switch (c.op) {
     case OP.push:
      opPush(newCode, c);
      break;
     case OP.jez: // JEZ
      // branch is a kind of pointer.
      // Not; pointer へと書き換えることで、スタックのトップが0かそうでないかで分岐することが可能となる。
      var funs = {
        7: function(l) { l.push({ op: OP.notbranch, label: c.label, count: labelCount, jump: true }); },
        5: function(l) {
          l.push({ op: OP.not });
          l.push({ op: OP.branch, label: c.label, count: labelCount, jump: true });
        },
      };
      sizedPush(funs, newCode[0]);
      ++labelCount;
      break;
     case OP.jmp: // JMP
      newCode[0].push({ op: OP.left2down, label: c.label, count: labelCount, jump: true });
      ++labelCount;
      break;
    default:
      newCode[0].push(c);
    }
  }
  newCode[0].push({ op: OP.terminate });
  return { 'code': newCode,
           'count': labelCount };
}

function genCodeMap(code) {
  'use strict';
  console.log("genCodeMap");

  var tmp = genCodeChain(code);
  var newCode = tmp['code'];
  var labelCount = tmp['count'];

  for (var i = 0; i < labelCount; ++i) {
    newCode.push([]);
    for (var c = 0; c < newCode[0].length; ++c) {
      newCode[i+1].push({ op: OP.black });
    }

    // Jump系を探す。
    var j = 0;
    for (j = 0; j < newCode[0].length; ++j) {
      if (isJump(newCode[0][j])) {
        if (newCode[0][j].count === i) {
          break;
        }
      }
    }

    if (j == newCode[0].length) {
      throw("never come");
    }
    var word = newCode[0][j].label;

    // 対応するラベルを探す。
    var k = 0;
    for (k = 0; k < newCode[0].length; ++k) {
      if (newCode[0][k].op === OP.label) {
        if (newCode[0][k].word === word) {
          break;
        }
      }
    }
    if (k == newCode[0].length) {
      throw("label " + word + " not found.");
    }

    // ラベルとジャンプを繋ぐ。
    if (j < k) {// right
      // 縦
      for (var l = 1; l <= i; ++l) {
        if (newCode[l][j].op === OP.black) { // 黒
          newCode[l][j].op = OP.nop_v; // vnop
        } else {
          newCode[l][j].op = OP.cross; // cross
        }
      }
      newCode[i+1][j].op = OP.up2right;
      for (var l = j + 1; l < k; ++l) {
        newCode[i+1][l].op = OP.nop_h; // hnop
      }
      newCode[i+1][k].op = OP.left2up;
      for (var l = i; 0 < l; --l) {
        if (newCode[l][k].op === OP.black) { // 黒
          newCode[l][k].op = OP.nop_v; // vnop
        } else if (newCode[l][k].op === OP.nop_h) { // hnop
          newCode[l][k].op = OP.cross; // cross
        } else if (newCode[l][k].op === OP.right2up){
          newCode[l][k].op = OP.rjoin; // rjoin
          break;
        } else if (newCode[l][k].op === OP.left2up){
          newCode[l][k].op = OP.ljoin; // ljoin
          break;
        } else {
          throw ("never come");
        }
      }
    } else { // left
      // 縦
      for (var l = 1; l <= i; ++l) {
        if (newCode[l][j].op === OP.black) { // 黒
          newCode[l][j].op = OP.nop_v; // vnop
        } else {
          newCode[l][j].op = OP.cross; // cross
        }
      }
      newCode[i+1][j].op = OP.up2left;
      for (var l = k + 1; l < j; ++l) {
        newCode[i+1][l].op = OP.nop_h; // hnop
      }
      newCode[i+1][k].op = OP.right2up;
      for (var l = i; 0 < l; --l) {
        if (newCode[l][k].op === OP.black) { // 黒
          newCode[l][k].op = OP.nop_v; // vnop
        } else if (newCode[l][k].op === OP.nop_h) { // hnop
          newCode[l][k].op = OP.cross; // cross
        } else if (newCode[l][k].op === OP.right2up){
          newCode[l][k].op = OP.rjoin; // rjoin
          break;
        } else if (newCode[l][k].op === OP.left2up){
          newCode[l][k].op = OP.ljoin; // ljoin
          break;
        } else {
          throw ("never come");
        }
      }
    }
  }
  return newCode;
}

function sanityCheck(opcode) {
  'use strict';
  if (opcode.op === OP.push) {
    if (opcode.val !== 1) {
      // if this, genCodeMap maybe somethig wrong.
      return false;
    }
  }
  return true;
}

function generateImage(code, outfile) {
  'use strict';
  console.log("generateImage");
  var height = config.unit * code.length;
  var width = config.unit * code[0].length;
  var canvas = new Canvas(width, height);
  var ctx = canvas.getContext('2d');

  ctx.drawImage(config.images[config.unit]['start'].image, 0, 0);

  for (var i = 0; i < code.length; ++i) {
    for (var j = 0; j < code[0].length; ++j) {
      // コードに対応した画像を挿入する｡
      var opCode = code[i][j];
      if (!sanityCheck(opCode)) {
        console.error(opCode);
        throw opCode;
      }
      var op = opTable[opCode.op];
      var filename = op['filename'];
      if (filename === 'label') {
        filename = 'join';
      }
      ctx.drawImage(config.images[config.unit][filename].image, j * config.unit, i * config.unit);
    }
  }

  // 以下保存
  var out = fs.createWriteStream(outfile);
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
  exit(-1);
}
var filename = process.argv[2];
var outfile = process.argv[3] || 'out.png';

for (var k in config.images[config.unit]) {
  var image = new Image();
  image.src = fs.readFileSync(config.images[config.unit][k].file);
  config.images[config.unit][k].image = image;
}

fs.readFile(filename, 'utf8', function (err, data) {
  if (err) throw err;
  var code = analyze(data);

  var codemap = genCodeMap(code);
  generateImage(codemap, outfile);
});
