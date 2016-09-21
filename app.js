// app.js

const opTable = {
  0: { filename: 'push', toRight: true },
  1: { filename: 'pop', toRight: true },
  2: { filename: 'add', toRight: true },
  3: { filename: 'sub', toRight: true },
  4: { filename: 'mul', toRight: true },
  5: { filename: 'div', toRight: true },
  6: { filename: 'mod', toRight: true },
  7: { filename: 'not', toRight: true },
  8: { filename: 'greater', toRight: true },
  9: { filename: 'dup', toRight: true },
  10: { filename: 'roll', toRight: true },
  15: { filename: 'in_n', toRight: true },
  16: { filename: 'in_c', toRight: true },
  17: { filename: 'out_n', toRight: true },
  18: { filename: 'out_c', toRight: true },
  19: { filename: 'start', toRight: true },
  20: { filename: 'terminate', toRight: false },
  21: { filename: 'jez', toRight: true }, // image not exists
  22: { filename: 'label', toRight: true }, // image not exists
  23: { filename: 'jmp', toRight: false }, // image not exists

  24: { filename: 'black', toRight: false }, // only use generate
  25: { filename: 'branch', toRight: true },
  26: { filename: 'nop_h', toRight: true },
  27: { filename: 'nop_v', toRight: false },
  28: { filename: 'curve5', toRight: false }, // 上から左
  29: { filename: 'curve6', toRight: false }, // 右から上
  30: { filename: 'curve4', toRight: true }, // 上から右
  31: { filename: 'curve7', toRight: false }, // 左から上
  32: { filename: 'cross', toRight: true },
  33: { filename: 'join', toRight: true },
  34: { filename: 'rjoin', toRight: true },
  35: { filename: 'ljoin', toRight: false },
  36: { filename: 'curve1', toRight: false }, // 左から下
  37: { filename: 'curve2', toRight: true }, // 下から右

  40: { filename: 'push0', toRight: true },
  41: { filename: 'push2', toRight: true },
  42: { filename: 'push3', toRight: true },
  43: { filename: 'push4', toRight: true },
  50: { filename: 'push16', toRight: true },
  51: { filename: 'push32', toRight: true },

  65: { filename: 'dupadd', toRight: true },
  66: { filename: 'dupmul', toRight: true },
  67: { filename: 'notbranch', toRight: true },
  68: { filename: 'swap', toRight: true },
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
  down2right: 37,
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

const Canvas = require('canvas');
const fs = require('fs');
const config = require('./config');

const Image = Canvas.Image;

function pusher1(l, op) {
  'use strict';
  l.push({ op });
}

function debugLog(level, out) {
  if (config.debug > level) {
    console.log(out);
  }
}

function analyze(data) {
  'use strict';
  const lines = data.split('\n');
  const code = [];
  for (const l of lines) {
    let m;
    let f = false;
    if ((m = l.match(/^\s*PUSH\s+(\d+)/i))) {
      code.push({ op: OP.push, val: parseInt(m[1], 10) });
      f = true;
    }
    if ((m = l.match(/^\s*PUSH\s+'(\\?.)'/i))) {
      if (m[1][0] === '\\') {
        // エスケープ文字の処理をする。
        throw new Error('escape is un impled now');
      } else {
        code.push({ op: OP.push, val: m[1][0].charCodeAt() });
      }
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
      code.push({ op: OP.swap });
      f = true;
    }

    if (l.match(/(^#.*$|\s*)/i)) {
      // コメント or 空行
      f = true;
    }

    if (!f) {
      console.log(`unknown token: ${l}`);
    }
  }
  return code;
}

function isJump(opCode) {
  'use strict';
  return !!opCode.jump;
}

function sizedPush(funs, list) {
  'use strict';
  const fun = funs[config.unit];
  if (!fun) throw new Error('never come!(unknown unit size)');
  fun(list);
}

function opPush(newCode, c) {
  'use strict';
  if (c.val === 0) {
    if (config.unit >= 5) {
      newCode[0].push({ op: OP.push0 });
    } else {
      newCode[0].push({ op: OP.push, val: 1 });
      newCode[0].push({ op: OP.not });
    }
  } else if (c.val === 1) {
    newCode[0].push(c);
  } else if (c.val === 2) {
    newCode[0].push({ op: OP.push2 });
  } else if (c.val === 3 && config.unit >= 5) {
    newCode[0].push({ op: OP.push3 });
  } else if (c.val === 4 && config.unit >= 5) {
    newCode[0].push({ op: OP.push4 });
  } else {
    newCode[0].push({ op: OP.push2 });
    let sum = 2;
    const tar = c.val;
    while (tar !== sum) {
      if (tar === sum + 1) {
        newCode[0].push({ op: OP.push, val: 1 });
        newCode[0].push({ op: OP.add });
        break;
      } else {
        let d = 2;
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
        } else if (config.unit === 3) {
          newCode[0].push({ op: OP.push2 });
        } else {
          throw new Error('never come!(unknown unit size)');
        }
        for (;;) {
          if (d * d + sum < tar) {
            if (config.unit === 3) {
              newCode[0].push({ op: OP.dup });
              newCode[0].push({ op: OP.mul });
            } else {
              newCode[0].push({ op: OP.dupmul });
            }
            d *= d;
          } else if (d * 2 + sum < tar) {
            if (config.unit === 3) {
              newCode[0].push({ op: OP.dup });
              newCode[0].push({ op: OP.add });
            } else {
              newCode[0].push({ op: OP.dupadd });
            }
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
  console.log('genCodeChain');
  const newCode = [];
  newCode[0] = [];
  newCode[0].push({ op: OP.start });
  let labelCount = 0;
  for (const c of code) {
    switch (c.op) {
      case OP.push: {
        opPush(newCode, c);
        break;
      }
      case OP.jez: { // JEZ
        // branch is a kind of pointer.
        // Not; pointer へと書き換えることで、スタックのトップが0かそうでないかで分岐することが可能となる。
        const jezDefault = (l) => {
          l.push({ op: OP.not });
          l.push({ op: OP.branch, label: c.label, count: labelCount, jump: true });
        };
        const jezFuns = {
          7: (l) => { l.push({ op: OP.notbranch, label: c.label, count: labelCount, jump: true }); },
          5: jezDefault,
          3: jezDefault,
        };
        sizedPush(jezFuns, newCode[0]);
        ++labelCount;
        break;
      }
      case OP.jmp: { // JMP
        newCode[0].push({ op: OP.left2down, label: c.label, count: labelCount, jump: true });
        ++labelCount;
        break;
      }
      case OP.swap: {
        const f = (c) => {
          c.push({ op: OP.push2 });
          c.push({ op: OP.push, val: 1 });
          c.push({ op: OP.roll });
        };
        const funs = {
          7: (c) => { c.push({ op: OP.swap }); },
          5: f,
          3: f,
        };
        sizedPush(funs, newCode[0]);
        break;
      }
      default: {
        newCode[0].push(c);
      }
    }
  }
  if (opTable[newCode[0][newCode[0].length - 1].op].toRight) {
    newCode[0].push({ op: OP.terminate });
  }
  return { code: newCode,
           count: labelCount };
}

function optimize(chain) {
  'use strict';
  console.log('optimize(level: %s)', config.level);

  return chain;
}

function crossable(c) {
  'use strict';
  if (c.op === OP.black || c.op === OP.nop_v) return true;
  return false;
}

function findSpace(map, i, s, g) {
  'use strict';
  for (let c = 0; c <= i; ++c) {
    let flg = true; // crossable
    for (let l = s; l <= g; ++l) {
      if (!crossable(map[c + 1][l])) {
        flg = false;
        break;
      }
    }
    if (flg) return c;
  }
  return i;
}

function genCodeMap(code) {
  'use strict';
  console.log('genCodeMap');

  const tmp = genCodeChain(code);
  let newCode = tmp.code;
  const labelCount = tmp.count;

  newCode = optimize(newCode);

  for (let i = 0; i < labelCount; ++i) {
    newCode.push([]);
    for (let c = 0; c < newCode[0].length; ++c) {
      newCode[i + 1].push({ op: OP.black });
    }

    // Jump系を探す。
    let j = 0;
    for (j = 0; j < newCode[0].length; ++j) {
      if (isJump(newCode[0][j])) {
        if (newCode[0][j].count === i) {
          break;
        }
      }
    }

    if (j === newCode[0].length) {
      throw new Error('never come');
    }
    const word = newCode[0][j].label;

    // 対応するラベルを探す。
    let k = 0;
    for (k = 0; k < newCode[0].length; ++k) {
      if (newCode[0][k].op === OP.label) {
        if (newCode[0][k].word === word) {
          break;
        }
      }
    }
    if (k === newCode[0].length) {
      throw new Error(`label ${word} not found.`);
    }

// ラベルとジャンプを繋ぐ。
    if (j < k) { // right
      // 上が開いてるかどうかを確認。
      const current = findSpace(newCode, i, j, k);
      // 縦
      for (let l = 1; l <= current; ++l) {
        if (newCode[l][j].op === OP.black) { // 黒
          newCode[l][j].op = OP.nop_v; // vnop
        } else {
          newCode[l][j].op = OP.cross; // cross
        }
      }
      newCode[current + 1][j].op = OP.up2right;
      for (let l = j + 1; l < k; ++l) {
        if (newCode[current + 1][l].op === OP.nop_v) {
          newCode[current + 1][l].op = OP.cross;
        } else {
          newCode[current + 1][l].op = OP.nop_h;
        }
      }
      if (newCode[current + 1][k].op === OP.nop_v) {
        newCode[current + 1][k].op = OP.ljoin;
      } else {
        newCode[current + 1][k].op = OP.left2up;
      }
      for (let l = current; 0 < l; --l) {
        if (newCode[l][k].op === OP.black) { // 黒
          newCode[l][k].op = OP.nop_v; // vnop
        } else if (newCode[l][k].op === OP.nop_h) { // hnop
          newCode[l][k].op = OP.cross; // cross
        } else if (newCode[l][k].op === OP.right2up) {
          newCode[l][k].op = OP.rjoin; // rjoin
          break;
        } else if (newCode[l][k].op === OP.left2up) {
          newCode[l][k].op = OP.ljoin; // ljoin
          break;
        } else if (newCode[l][k].op === OP.ljoin ||
                   newCode[l][k].op === OP.rjoin ||
                   newCode[l][k].op === OP.cross) {
          /* do nothing */
        } else {
          throw new Error('never come');
        }
      }
    } else { // left
      // 上が開いてるかどうかを確認。
      const current = findSpace(newCode, i, k, j);
      // 縦
      for (let l = 1; l <= current; ++l) {
        if (newCode[l][j].op === OP.black) { // 黒
          newCode[l][j].op = OP.nop_v; // vnop
        } else {
          newCode[l][j].op = OP.cross; // cross
        }
      }
      newCode[current + 1][j].op = OP.up2left;
      for (let l = k + 1; l < j; ++l) {
        if (newCode[current + 1][l].op === OP.nop_v) {
          newCode[current + 1][l].op = OP.cross;
        } else {
          newCode[current + 1][l].op = OP.nop_h;
        }
      }
      if (newCode[current + 1][k].op === OP.nop_v) {
        newCode[current + 1][k].op = OP.rjoin;
      } else {
        newCode[current + 1][k].op = OP.right2up;
      }
      for (let l = current; 0 < l; --l) {
        if (newCode[l][k].op === OP.black) { // 黒
          newCode[l][k].op = OP.nop_v; // vnop
        } else if (newCode[l][k].op === OP.nop_h) { // hnop
          newCode[l][k].op = OP.cross; // cross
        } else if (newCode[l][k].op === OP.right2up) {
          newCode[l][k].op = OP.rjoin; // rjoin
          break;
        } else if (newCode[l][k].op === OP.left2up) {
          newCode[l][k].op = OP.ljoin; // ljoin
          break;
        } else if (newCode[l][k].op === OP.ljoin ||
                   newCode[l][k].op === OP.rjoin ||
                   newCode[l][k].op === OP.cross) {
          /* do nothing */
        } else {
          throw new Error('never come');
        }
      }
    }
  }
  // delete all black line
  for (let c = newCode.length - 1; c > 0; c--) {
    let flg = true;
    for (const o of newCode[c]) {
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
  console.log('rewriteCodemap');

  return codemap;
}
function generateImage(code, outfile) {
  'use strict';
  console.log('generateImage');
  const height = config.unit * code.length;
  const width = config.unit * code[0].length;
  const canvas = new Canvas(width, height);
  const ctx = canvas.getContext('2d');

  ctx.drawImage(config.images[config.unit].start.image, 0, 0);

  debugLog(50, code);
  for (let i = 0; i < code.length; ++i) {
    for (let j = 0; j < code[0].length; ++j) {
      // コードに対応した画像を挿入する｡
      const opCode = code[i][j];
      if (!sanityCheck(opCode)) {
        console.error(opCode);
        throw opCode;
      }
      debugLog(20, opCode);
      const op = opTable[opCode.op];
      debugLog(15, op);
      let filename = op.filename;
      if (filename === 'label') {
        if (opTable[code[i][j - 1].op].toRight) {
          filename = 'join';
        } else {
          filename = 'curve2';
        }
      }
      debugLog(10, filename);
      ctx.drawImage(config.images[config.unit][filename].image, j * config.unit, i * config.unit);
    }
  }

  // 以下保存
  const out = fs.createWriteStream(outfile);
  const stream = canvas.pngStream();

  stream.on('data', (chunk) => {
    out.write(chunk);
  });

  stream.on('end', () => {
    console.log('saved png');
  });
}

if (process.argv.length < 3) {
  console.log('missing argument.');
  process.exit(-1);
}
const filename = process.argv[2];
const outfile = process.argv[3] || 'out.png';

for (const k in config.images[config.unit]) {
  if ({}.hasOwnProperty.call(config.images[config.unit], k)) {
    const image = new Image();
    image.src = fs.readFileSync(config.images[config.unit][k].file);
    config.images[config.unit][k].image = image;
  }
}

fs.readFile(filename, 'utf8', (err, data) => {
  if (err) throw err;
  const code = analyze(data);

  const codemap = genCodeMap(code);
  const rewritedCodemap = rewriteCodemap(codemap);
  generateImage(rewritedCodemap, outfile);
});
