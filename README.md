# Piet automata

自動piet生成｡

# Gallery

* Hello, World!
![Hello, World!](https://raw.githubusercontent.com/nna774/piet-automata/master/output/helloworld.png)

* puts 72
![puts 72](https://raw.githubusercontent.com/nna774/piet-automata/master/output/puts72.png)

* even-or-odd(標準入力から一つ読み取り、それが奇数なら1を出し、そうでないならば0を出す)
![even-or-odd](https://raw.githubusercontent.com/nna774/piet-automata/master/output/even-or-odd.png)

# 中間言語
スタック志向っぽい言語。
一つだけ整数のスタックを持っている。

# 命令一覧

## PUSH 1
スタックに1を積む。

## POP
スタックの先頭を捨てる。

## ADD
スタックから2つ取り和を積む。

## SUB
スタックから2つ取り、2つ目から1つ目を引いた値を積む。

## MUL
スタックから2つ取り積を積む。

## DIV
スタックから2つ取り、2つ目を1つ目で割った商を積む。

## MOD
スタックから2つ取り、2つ目を1つ目で割った余りを積む。

## NOT
スタックから1つ取り、それが0ならば1を積み、そうでないならば0を積む。

## GREATER
スタックから2つ取り、2つ目のほうが1つ目より大きければ1、そうでないならば0を積む。

## DUP
スタックから1つ取り、それを2つ積む。

## ROLL
Pietのロールそのまま。
スタックから2つ取り、2つ目分の深さまでのスタックの値を1つ目分だけ回転する。

回転とは、トップの値を指定の深さに落とし、それ以外を一つづつ上げる操作。

1 2 3 4 3 2 -> top の状態からロールを行うと、
結果は 1 3 4 2 -> top となる。

http://www.slideshare.net/KMC_JP/piet-46068527 ここの39-40を見て下さい。

## INN
標準入力から数字を一つ読み取り、その値をスタックに積む。

## INC
標準入力から一文字読み取り、その文字のUnicode値をスタックに積む。

インクリメントではない。

## OUTN
スタックから1つ取り、それを数字として出力する。

## OUTC
スタックから1つ取り、そのUnicode値を持つ文字を出力する。

## HALT
プログラムを停止させる。

## LABEL word
その位置にあとで飛んでこれるラベルをつける。

## JEZ word
スタックのから1つ取り、その値がゼロなら、対応するwordを持つLABELにジャンプする。

Jump Equal Zero
