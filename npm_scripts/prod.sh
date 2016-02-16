#!/bin/sh

# Vars
appDir=$PWD/app
keyPemFile=$PWD/$1
xvfbScreen=$2

# Drop prod-directory
rm -rf $appDir/prod

# 1. Checking '.pem':
echo "-- 1. Checking '.pem':"
	keyPemParam=''
	if [ -f $keyPemFile ]; then
		echo "Using $keyPemFile"
		keyPemParam="--pack-extension-key=$keyPemFile"
	else
		echo "Key not found. Will be generated."
	fi

# 2. Create '.crx' and '.zip':
echo "-- 2. Create '.crx' and '.zip':"
	npm run chrome -- --pack-extension=$appDir/build $keyPemParam --enable-experimental-extension-apis --no-message-box --no-sandbox > /dev/null 

	if [ -f $appDir/build.crx ]; then
		cp $appDir/build.crx $appDir/build.zip
		echo "Done! '.crx' was created."
	else
		echo "Error! '.crx' was not created."
		exit
	fi

# 3. Move files to prod-directory:
echo "-- 3. Move files to prod-directory:"
	mkdir $appDir/prod
	mv $appDir/build.crx $appDir/prod/build.crx
	mv $appDir/build.zip $appDir/prod/build.zip

	if [ -f $keyPemFile ]; then
		cp $keyPemFile $appDir/prod/build.pem	
	else
		mv $appDir/build.pem $appDir/prod/build.pem
	fi

	cd $appDir/prod/
	ls