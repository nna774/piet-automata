// app.js

var opTable = {
  0: { 'filename': 'push' },
  1: { 'filename': 'pop' },
  2: { 'filename': 'add' },
  3: { 'filename': 'sub' },
  4: { 'filename': 'mul' },
  5: { 'filename': 'div' },
  6: { 'filename': 'mod' },
  7: { 'filename': 'not' },
  8: { 'filename': 'greater' },
  9: { 'filename': 'dup' },
  10: { 'filename': 'roll' },
  15: { 'filename': 'in_n' },
  16: { 'filename': 'in_c' },
  17: { 'filename': 'out_n' },
  18: { 'filename': 'out_c' },
  19: { 'filename': 'start' },
  20: { 'filename': 'terminate' },
  21: { 'filename': 'jez' }, // image not exists
  22: { 'filename': 'label' }, // image not exists
  23: { 'filename': 'jmp' }, // image not exists

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
  42: { 'filename': 'push3' },
  43: { 'filename': 'push4' },
  50: { 'filename': 'push16' },
  51: { 'filename': 'push32' },

  65: { 'filename': 'dupadd' },
  66: { 'filename': 'dupmul' },
  67: { 'filename': 'notbranch' },
  68: { 'filename': 'swap' },
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
  push3: 42,
  push4: 43,
  push16: 50,
  push32: 51,
  dupadd: 65,
  dupmul: 66,
  notbranch: 67,
  swap: 68,
};

var Canvas = require('canvas')
  , Image = Canvas.Image
  , fs = require('fs')
  , config = require('./config');

function pusher1(l, op) {
  'use strict';
  l.push({ op: op});
}

function debug_log(level, out) {
  if (config.debug > level) {
    console.log(out);
  }
}

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
      pusher1(code, OP.pop);
      f = true;
    }
    if (l.match(/^\s*ADD/i)) {
      pusher1(code, OP.add);
      f = true;
    }
    if (l.match(/^\s*SUB/i)) {
      pusher1(code, OP.sub);
      f = true;
    }
    if (l.match(/^\s*MUL/i)) {
      pusher1(code, OP.mul);
      f = true;
    }
    if (l.match(/^\s*DIV/i)) {
      pusher1(code, OP.div);
      f = true;
    }
    if (l.match(/^\s*MOD/i)) {
      pusher1(code, OP.mod);
      f = true;
    }
    if (l.match(/^\s*NOT/i)) {
      pusher1(code, OP.not);
      f = true;
    }
    if (l.match(/^\s*GREATER/i)) {
      pusher1(code, OP.greater);
      f = true;
    }
    if (l.match(/^\s*DUP/i)) {
      pusher1(code, OP.dup);
      f = true;
    }
    if (l.match(/^\s*ROLL/i)) {
      pusher1(code, OP.roll);
      f = true;
    }
    if (l.match(/^\s*INN/i)) {
      pusher1(code, OP.in_n);
      f = true;
    }
    if (l.match(/^\s*INC/i)) {
      pusher1(code, OP.in_c);
      f = true;
    }
    if (l.match(/^\s*OUTN/i)) {
      pusher1(code, OP.out_n);
      f = true;
    }
    if (l.match(/^\s*OUTC/i)) {
      pusher1(code, OP.out_c);
      f = true;
    }
    if (l.match(/^\s*HALT/i)) {
      pusher1(code, OP.terminate);
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
  } else if (c.val === 3) {
    newCode[0].push({ op: OP.push3 });
  } else if (c.val === 4) {
    newCode[0].push({ op: OP.push4 });
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
          } else if (sum + 4 < tar) {
            d = 4;
            newCode[0].push({ op: OP.push4 });
          } else {
            newCode[0].push({ op: OP.push2 });
          }
        } else if (config.unit === 5) {
          if (sum + 4 < tar) {
            d = 4;
            newCode[0].push({ op: OP.push4 });
          } else {
            newCode[0].push({ op: OP.push2 });
          }
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

function optimize(chain) {
  'use strict';
  console.log("optimize(level: %s)", config.level);

  return chain;
}

function crossable(c) {
  'use strict';
  if (c.op === OP.black || c.op === OP.nop_v) return true;
  return false;
}

function findSpace(map, i, s, g) {
  'use strict';
  for (; i > 0; --i) {
    var flg = true; // crossable
    for (var l = s; l <= g; ++l) {
      if (! crossable(map[i][l])) {
        flg = false;
        break;
      }
    }
    if (!flg) return i;
  }
  return 0;
}

function genCodeMap(code) {
  'use strict';
  console.log("genCodeMap");

  var tmp = genCodeChain(code);
  var newCode = tmp['code'];
  var labelCount = tmp['count'];

  newCode = optimize(newCode);

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
      // 上が開いてるかどうかを確認。
      var current = findSpace(newCode, i, j, k);
      // 縦
      for (var l = 1; l <= current; ++l) {
        if (newCode[l][j].op === OP.black) { // 黒
          newCode[l][j].op = OP.nop_v; // vnop
        } else {
          newCode[l][j].op = OP.cross; // cross
        }
      }
      newCode[current+1][j].op = OP.up2right;
      for (var l = j + 1; l < k; ++l) {
        newCode[current+1][l].op = OP.nop_h; // hnop
      }
      newCode[current+1][k].op = OP.left2up;
      for (var l = current; 0 < l; --l) {
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
      // 上が開いてるかどうかを確認。
      var current = findSpace(newCode, i, k, j);
      // 縦
      for (var l = 1; l <= current; ++l) {
        if (newCode[l][j].op === OP.black) { // 黒
          newCode[l][j].op = OP.nop_v; // vnop
        } else {
          newCode[l][j].op = OP.cross; // cross
        }
      }
      newCode[current+1][j].op = OP.up2left;
      for (var l = k + 1; l < j; ++l) {
        newCode[current+1][l].op = OP.nop_h; // hnop
      }
      newCode[current+1][k].op = OP.right2up;
      for (var l = current; 0 < l; --l) {
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
  // delete all black line
  for(var c = newCode.length - 1; c > 0; c--) {
    var flg = true;
    for (var o of newCode[c]) {
      if (o.op !== OP.black) {
        flg = false;
        break;
      }
    }
    if (flg) {
      newCode.pop();
    } else {
      break;
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

function rewriteCodemap(codemap) {
  'use strict';
  console.log("rewriteCodemap");

  return codemap;
}
function generateImage(code, outfile) {
  'use strict';
  console.log("generateImage");
  var height = config.unit * code.length;
  var width = config.unit * code[0].length;
  var canvas = new Canvas(width, height);
  var ctx = canvas.getContext('2d');

  ctx.drawImage(config.images[config.unit]['start'].image, 0, 0);

  debug_log(50, code);
  for (var i = 0; i < code.length; ++i) {
    for (var j = 0; j < code[0].length; ++j) {
      // コードに対応した画像を挿入する｡
      var opCode = code[i][j];
      if (!sanityCheck(opCode)) {
        console.error(opCode);
        throw opCode;
      }
      debug_log(20, opCode);
      var op = opTable[opCode.op];
      debug_log(15, op);
      var filename = op['filename'];
      if (filename === 'label') {
        filename = 'join';
      }
      debug_log(10, filename);
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
  codemap = rewriteCodemap(codemap);
  generateImage(codemap, outfile);
});
