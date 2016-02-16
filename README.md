![Minimalistic Starter-kit for building Chrome-extensions with Webpack](http://webdev.deflate.ru/stuff/w4ce/w4ce.png?v=0.0.4)

[![devDependency Status](https://david-dm.org/WebDevArchive/Webpack4ChromeExtension/dev-status.svg?style=flat)](https://david-dm.org/WebDevArchive/Webpack4ChromeExtension#info=devDependencies)

#Webpack4ChromeExtension v0.0.4
## Installation
```
git clone https://github.com/WebDevArchive/Webpack4ChromeExtension.git
cd Webpack4ChromeExtension
npm install
```

## Usage:

+ Run `npm run dev` (webpack watch + webpack-dev-server with hot module replacement).
+ Load unpacked extension to Chrome (from `app/build/` directory). Or see `npm run chrome:load`.
+ Write your code in "app/src/", when you are done - run `npm run build`.
+ Create .crx and .pem via `npm run prod`.

## Basic commands:

| Command:             | Short description:                                                        |
|:-------------------- |:------------------------------------------------------------------------- |
| **npm run dev**      | Development build: dev-tools, watching, HMR, autoreloading the extension. |
| **npm run build**    | Production build without dev-tools (into "app/build/").                   |
| **npm run prod**     | Create "build.crx", "build.pem" and "build.zip" (into "app/prod/")        |

## Advanced commands:

| Command:                   | Short description:                                                       |
|:-------------------------- |:------------------------------------------------------------------------ |
| **npm run chrome**         | Cross-platform chrome-launcher wuth args (used for crx-production, etc). |
| **npm run chrome:load**    | Load unpacked extension to Chrome (all Chrome-instances must be closed). |
| **npm run install:xvfb**   | Install/Update "Xvfb" (virtual screen). For working via SSH or for CI.   |
| **npm run install:chrome** | Install "google-chrome" if it doesn't exist (shortcut for 'apt-get').    |

## Structure of `app/src/`
```
	[src]                      [Sources]
	|     manifest.json.ejs     template of manifest.json (info from package.json is available)
	|
	+--[content]               [Content-script]
	|     content.js            Appending <script src="injected/injected.js"> for acsess to DOM,
	|                           appending <link href="injected/injected.css">.
	|
	+--[injected]              [Injected-script files]
	|     injected.js           your code for injected-script.
	|     injected.css          
	|
	+--[background]            [Background-page files]
	|     background.ejs        template for background-page (for "background.js" debugging).
	|     background.js         your code for background-page.
	|   
	+--[options]               [Options-page files]
	|     options.ejs           template of options-page.
	|     options.js            your code for options-page.
	|     options.css           css for options-page.
	|   
	+--[popup]                 [Popup-page files]
	|     popup.ejs             template of popup-page.
	|     popup.js              your code for popup-page.
	|     popup.css             css for popup page.
	|   
	+--[icons]                 [Icons]
	                            16px, 32px, 48px, 128px - replace to your own.
```

## Structure of `npm_scripts/`
```
	[npm_scripts]              
	|     build.js              Production build.
	|     dev.js                Development build.
	|     prod.sh               CRX and Zip production.
	|
	+--[webpack]               [webpack-specified files: config, plugins, etc]
	|     webpack.config.js     Webpack main config: "function(env)".
	|
	+--[chrome]                
	|     chrome.sh             Cross-platform chrome-launcher.
	|     load-extension.sh     Load unpacked extension to Chrome.
	|
	+--[install]               [installations for CI or working via SSH]
              google-chrome.sh      Install "google-chrome" if it doesn't exist.
              xvfb.sh               Virtual screen: "Xvfb :99 -screen 0 1024x768x16".
```

## Contact
- **E-mail**: stas.webwork@gmail.com
- **WebDevArchive**: http://vk.com/webdevarchive

## TODO
- chrome.runtime.reload() - HMR and page reloading is not sufficient in some cases.
- Detailed description.
- Copy static assets (-require from content.js)
- Useful classes (save/load options, content-background communication, etc).
- Selenuim tests
- esdoc / eslint (?)