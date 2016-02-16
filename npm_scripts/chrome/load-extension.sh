#!/bin/sh

# Load unpacked extension to Chrome.
# All Chrome-windows must be closed.

unpackedExtension=$PWD/$1
npm run chrome -- --load-extension=$unpackedExtension > /dev/null