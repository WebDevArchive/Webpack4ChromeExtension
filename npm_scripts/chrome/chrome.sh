#!/bin/sh

# Cross-platform chrome-launcher.
# Using: npm run chrome --args
# Virtual screen if first arg == "--xvfb"

case "$(uname -s)" in
	CYGWIN*|MINGW*|MSYS*)
		cmd //c "start /wait chrome $@"
	;;
	*)
		# npm run install:chrome # TODO: uncomment?
		if [ "$1" == '--xvfb' ]; then
			echo "!!!! xvfb"
			npm run install:xvfb
			Xvfb :99 -screen 0 1024x768x16 &
			sudo ps aux | grep X
			DISPLAY=:99.0
			export DISPLAY
		fi
		google-chrome $@
	;;

esac