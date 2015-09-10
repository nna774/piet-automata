#! /bin/sh -xe

CURRENT=`pwd`
cd $TESTUTILS_REL

node app.js $CURRENT/puts72.png $CURRENT/tests/tests/puts72.js
node app.js $CURRENT/puts72_2.png $CURRENT/tests/tests/puts72.js
node app.js $CURRENT/even-or-odd.png $CURRENT/tests/tests/even-or-odd.js
node app.js $CURRENT/helloworld.png $CURRENT/tests/tests/helloworld.js
node app.js $CURRENT/helloworld_2.png $CURRENT/tests/tests/helloworld.js
node app.js $CURRENT/jmp_2.png $CURRENT/tests/tests/puts1.js
node app.js $CURRENT/jmp_3.png $CURRENT/tests/tests/puts1.js
node app.js $CURRENT/gcd.png $CURRENT/tests/tests/gcd.js
node app.js $CURRENT/swap.png $CURRENT/tests/tests/swap.js
node app.js $CURRENT/lisp-like-calc.png $CURRENT/tests/tests/lisp-like-calc.js
