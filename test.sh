#! /bin/sh -xe

CURRENT=`pwd`
cd $TESTUTILS_REL
NODE="node --use_strict"

$NODE app.js $CURRENT/puts72.png $CURRENT/tests/tests/puts72.js
$NODE app.js $CURRENT/puts72_2.png $CURRENT/tests/tests/puts72.js
$NODE app.js $CURRENT/even-or-odd.png $CURRENT/tests/tests/even-or-odd.js
$NODE app.js $CURRENT/1to100.png $CURRENT/tests/tests/1to100.js
$NODE app.js $CURRENT/helloworld.png $CURRENT/tests/tests/helloworld.js
$NODE app.js $CURRENT/helloworld_2.png $CURRENT/tests/tests/helloworld.js
$NODE app.js $CURRENT/helloworld_3.png $CURRENT/tests/tests/helloworld.js
$NODE app.js $CURRENT/jmp_2.png $CURRENT/tests/tests/puts1.js
$NODE app.js $CURRENT/jmp_3.png $CURRENT/tests/tests/puts1.js
$NODE app.js $CURRENT/gcd.png $CURRENT/tests/tests/gcd.js
$NODE app.js $CURRENT/swap.png $CURRENT/tests/tests/swap.js
$NODE app.js $CURRENT/lisp-like-calc.png $CURRENT/tests/tests/lisp-like-calc.js
