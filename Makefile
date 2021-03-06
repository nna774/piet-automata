NODE = node --use_strict
APP = app.js

RM = rm -rf

images = puts72.png \
         puts72_2.png \
         even-or-odd.png \
         0to100.png \
         100to200.png \
         helloworld.png \
         helloworld_2.png \
         helloworld_3.png \
         jmp_2.png \
         jmp_3.png \
         gcd.png \
         swap.png \
         lisp-like-calc.png

images_notest = deadcode.png \
                removelabel.png \
                greater.png \
                if2.png \
                jmp.png \
                sub.png

all_images = $(images) $(images_notest)

all: $(all_images)

.SUFFIXES: .pas .png

%.png:: tests/%.pas app.js config.js
	 $(NODE) $(APP) $< $@

.PHONY: clean test lint
clean:
	$(RM) $(all_images)

test: $(all_images)
	TESTUTILS_REL=../piet-testutils ./test.sh

lint:
	npm run lint
