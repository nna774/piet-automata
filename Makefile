NODE = node
APP = app.js

RM = rm -rf

images = puts72.png puts72_2.png even-or-odd.png helloworld.png helloworld_2.png jmp_2.png jmp_3.png gcd.png swap.png lisp-like-calc.png

all: $(images)

.SUFFIXES: .pas .png

%.png:: tests/%.pas app.js config.js
	 $(NODE) $(APP) $< $@

.PHONY: clean test
clean:
	$(RM) $(images)

test: $(images)
	TESTUTILS_REL=../piet-testutils ./test.sh

