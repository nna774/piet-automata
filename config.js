// this should be 3, 5 or 7
const size = 3;

const optimezeLevel = 0;

// 0 ~ 100
const debug = 0;

const images = {
  3: {
    push: { file: 'piet/3x3/push1.png' },
    push2: { file: 'piet/3x3/push2.png' },
    push3: { file: 'piet/3x3/push3.png' },
    pop: { file: 'piet/3x3/pop.png' },
    add: { file: 'piet/3x3/add.png' },
    sub: { file: 'piet/3x3/sub.png' },
    mul: { file: 'piet/3x3/mul.png' },
    div: { file: 'piet/3x3/div.png' },
    mod: { file: 'piet/3x3/mod.png' },
    not: { file: 'piet/3x3/not.png' },
    greater: { file: 'piet/3x3/great.png' },
    dup: { file: 'piet/3x3/dup.png' },
    roll: { file: 'piet/3x3/roll.png' },
    in_n: { file: 'piet/3x3/in_n.png' },
    in_c: { file: 'piet/3x3/in_c.png' },
    out_n: { file: 'piet/3x3/out_n.png' },
    out_c: { file: 'piet/3x3/out_c.png' },
    nop_h: { file: 'piet/3x3/nop_h.png' },
    nop_v: { file: 'piet/3x3/nop_v.png' },
    cross: { file: 'piet/3x3/cross.png' },
    curve: { file: 'piet/3x3/curve1.png' },
    join: { file: 'piet/3x3/join.png' },
    branch: { file: 'piet/3x3/branch.png' },
    start: { file: 'piet/3x3/start.png' },
    terminate: { file: 'piet/3x3/terminate.png' },
    black: { file: 'piet/3x3/black.png' },
    curve1: { file: 'piet/3x3/curve1.png' },
    curve2: { file: 'piet/3x3/curve2.png' },
    curve4: { file: 'piet/3x3/curve4.png' },
    curve5: { file: 'piet/3x3/curve5.png' },
    curve6: { file: 'piet/3x3/curve6.png' },
    curve7: { file: 'piet/3x3/curve7.png' },
    rjoin: { file: 'piet/3x3/rjoin.png' },
    ljoin: { file: 'piet/3x3/ljoin.png' },
  },
  5: {
    push: { file: 'piet/5x5/push1.png' },
    push0: { file: 'piet/5x5/push0.png' },
    push2: { file: 'piet/5x5/push2.png' },
    push3: { file: 'piet/5x5/push3.png' },
    push4: { file: 'piet/5x5/push4.png' },
    pop: { file: 'piet/5x5/pop.png' },
    add: { file: 'piet/5x5/add.png' },
    sub: { file: 'piet/5x5/sub.png' },
    mul: { file: 'piet/5x5/mul.png' },
    div: { file: 'piet/5x5/div.png' },
    mod: { file: 'piet/5x5/mod.png' },
    not: { file: 'piet/5x5/not.png' },
    greater: { file: 'piet/5x5/great.png' },
    dup: { file: 'piet/5x5/dup.png' },
    dupadd: { file: 'piet/5x5/dupadd.png' },
    dupmul: { file: 'piet/5x5/dupmul.png' },
    roll: { file: 'piet/5x5/roll.png' },
    in_n: { file: 'piet/5x5/in_n.png' },
    in_c: { file: 'piet/5x5/in_c.png' },
    out_n: { file: 'piet/5x5/out_n.png' },
    out_c: { file: 'piet/5x5/out_c.png' },
    nop_h: { file: 'piet/5x5/nop_h.png' },
    nop_v: { file: 'piet/5x5/nop_v.png' },
    cross: { file: 'piet/5x5/cross.png' },
    curve: { file: 'piet/5x5/curve1.png' },
    join: { file: 'piet/5x5/join.png' },
    branch: { file: 'piet/5x5/branch.png' },
    start: { file: 'piet/5x5/start.png' },
    terminate: { file: 'piet/5x5/terminate.png' },
    black: { file: 'piet/5x5/black.png' },
    curve1: { file: 'piet/5x5/curve1.png' },
    curve2: { file: 'piet/5x5/curve2.png' },
    curve4: { file: 'piet/5x5/curve4.png' },
    curve5: { file: 'piet/5x5/curve5.png' },
    curve6: { file: 'piet/5x5/curve6.png' },
    curve7: { file: 'piet/5x5/curve7.png' },
    rjoin: { file: 'piet/5x5/rjoin.png' },
    ljoin: { file: 'piet/5x5/ljoin.png' },
  },
  7: {
    push: { file: 'piet/7x7/push1.png' },
    push0: { file: 'piet/7x7/push0.png' },
    push2: { file: 'piet/7x7/push2.png' },
    push3: { file: 'piet/7x7/push3.png' },
    push4: { file: 'piet/7x7/push4.png' },
    push16: { file: 'piet/7x7/push16.png' },
    push32: { file: 'piet/7x7/push32.png' },
    pop: { file: 'piet/7x7/pop.png' },
    add: { file: 'piet/7x7/add.png' },
    sub: { file: 'piet/7x7/sub.png' },
    mul: { file: 'piet/7x7/mul.png' },
    div: { file: 'piet/7x7/div.png' },
    mod: { file: 'piet/7x7/mod.png' },
    not: { file: 'piet/7x7/not.png' },
    greater: { file: 'piet/7x7/great.png' },
    dup: { file: 'piet/7x7/dup.png' },
    dupadd: { file: 'piet/7x7/dupadd.png' },
    dupmul: { file: 'piet/7x7/dupmul.png' },
    roll: { file: 'piet/7x7/roll.png' },
    in_n: { file: 'piet/7x7/in_n.png' },
    in_c: { file: 'piet/7x7/in_c.png' },
    out_n: { file: 'piet/7x7/out_n.png' },
    out_c: { file: 'piet/7x7/out_c.png' },
    nop_h: { file: 'piet/7x7/nop_h.png' },
    nop_v: { file: 'piet/7x7/nop_v.png' },
    cross: { file: 'piet/7x7/cross.png' },
    curve: { file: 'piet/7x7/curve1.png' },
    join: { file: 'piet/7x7/join.png' },
    branch: { file: 'piet/7x7/branch.png' },
    notbranch: { file: 'piet/7x7/notbranch.png' },
    start: { file: 'piet/7x7/start.png' },
    terminate: { file: 'piet/7x7/terminate.png' },
    black: { file: 'piet/7x7/black.png' },
    curve1: { file: 'piet/7x7/curve1.png' },
    curve2: { file: 'piet/7x7/curve2.png' },
    curve4: { file: 'piet/7x7/curve4.png' },
    curve5: { file: 'piet/7x7/curve5.png' },
    curve6: { file: 'piet/7x7/curve6.png' },
    curve7: { file: 'piet/7x7/curve7.png' },
    rjoin: { file: 'piet/7x7/rjoin.png' },
    ljoin: { file: 'piet/7x7/ljoin.png' },
    swap: { file: 'piet/7x7/swap.png' },
  },
};

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

module.exports = {
  images,
  unit: size,
  level: optimezeLevel,
  debug,
  OP,
  opTable,
};
