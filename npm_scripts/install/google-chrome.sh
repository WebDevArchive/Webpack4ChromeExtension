#!/bin/sh

echo "-- Checking 'google-chrome'"
googleChrome=$(command -v google-chrome)
if [ -n "$googleChrome" ]
then
	echo "'google-chrome' found."
else
	echo "'google-chrome' not found. Installing:"
	wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
	sh -c 'echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
	apt-get update
	apt-get --assume-yes install google-chrome-stable
fi
