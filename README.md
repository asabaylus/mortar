# Mortar [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

[![Build Status][travis-image]][travis-url]

A living style guide and usable component for National Geographic Society websites.

## Installing

### The good 'ol way

Go to the [releases](https://github.com/natgeo/mortar/releases) page and download the most recent zip file.

### Bower

You can include it as a bower dependency by running `bower install git@github.com:natgeo/mortar.git#x.x.x -s` or adding it to your `bower.json` like so:

``` json
{
  "dependencies": {
    "mortar": "git@github.com:natgeo/mortar.git#0.1.x"
  }
}
```

You can use fuzzy tags (e.g. `2.x`, `0.2.x`) or a specific version (e.g. `0.2.0`).

## Using

[The documentation](http://natgeo.github.io/mortar/) has explanatations of patterns and how they should be used. If anything is insufficiently explained please [file an issue](https://github.com/natgeo/mortar/issues). Following are instructions on using Mortar in your project:

1. **Including styles**
  - for `.css` make certain that the `icongs.css` is referenced in your `.html` file:
    ```html
    <link rel="stylesheet" href="./path/to/mortar.css">
    ```
  - for `.scss`  make certain that the `_icongs.scss` is referrence in you main `.scss` file
     ```scss
     @import "../path/to/mortar"
     ```
- **Including scripts**

*COMING SOON!*

- **Including fonts**

You'll likely need the right fonts to work in concert with Mortar each of which has different instructions for inclusion. Our icon font has instructions at  [it's repository](https://github.com/natgeo/icongs). Visit [confluence](https://confluence.nationalgeographic.com/display/DS/Web+Fonts) for our self hosted vendor font installation instructions.

## Development Environment

### Installation

Instructions are written for OS X. For Linux, switching references from `brew` to `apt-get` (or whichever package manager your linux distribution uses) should get the job done.

1. Open Terminal (Applications/Utilities/Terminal)
- Install [Homebrew](http://brew.sh/): ```ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"``` you may need to run ```sudo ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"``` and make certain that your user has administrative rights for the file system
  1. You may need to install XCode
  - Make sure everything is running smoothly with ```brew doctor```
- Install [NVM](https://github.com/creationix/nvm): ```curl https://raw.githubusercontent.com/creationix/nvm/v0.23.3/install.sh | bash``` (brew install is discouraged by nvm)
  1. Install [Node](http://nodejs.org/): ```nvm install 0.12```
  - Set a default node version ```nvm alias default stable```
  - If your project's node version is not the current stable version then you will need to run ```nvm use``` whenever you enter your project's repo
- Install [Grunt-Cli](http://gruntjs.com/): ```npm install -g grunt-cli```
- Install [Bower](http://bower.io/): ```npm install -g bower```
- Install [rbenv](https://github.com/sstephenson/rbenv): ```brew install rbenv ruby-build```
  1. **make sure to follow post install instructions**, add necessary lines to your shell profile. Run ```brew info rbenv``` if you missed them somehow the first time.
  - Install [Ruby](https://www.ruby-lang.org/en/): ```rbenv install 2.2.0```
  - Set a default ruby version ```rbenv global 2.2.0```
  - rbenv automatically respects the `.ruby-version` file found within projects
- Install [Bundler](http://bundler.io/): ```gem install bundler```
- Install packages by running ```npm install && bundle && bower install``` from the root directory of the project

### Grunt Tasks

#### `grunt`, `grunt fontcustom`

The default task will run fontcustom, building the various font files, scss, and demo page

#### `grunt serve`

This will build the font, css, scss, and demo page. It will then open the demo page in your default browser and watch all source and configuration files for changes. It will livereload if it detects any changes so you can see your modifications immediately. Comes loaded with [Browser Sync](https://github.com/shakyShane/browser-sync) so you can test across devices.

#### `grunt build`

This will compile fontcustom and then use [Grunt Build Control](https://github.com/robwierzbowski/grunt-build-control) to deploy the demo to Github Pages and then tag a new component release. At the moment the tag is grabbed from the `bower.json` file which you will have to update manually.

#### `grunt deploy`

As long as you've updated the version number inthe bower.json file this will deploy documentation as well as a new tagged release of the component.

### Making Changes

This is a list of things to keep in mind when modifying the icon font

- Don't throw just throw anything in the icon font, if this collection gets bloated we won't benefit from it's potential performance enhancement. Please consider the worth of all additions.
- [Semantic Versioning](http://semver.org/) is used for the release tags. Make sure you understand this very well before making updates so any on projects pulling in icongs via Bower do not have rendering errors.
- You'll need to update the semantic version in the [bower.json](https://github.com/natgeo/mortar/blob/0357dfdd41b10964acf296c2f4cea7bee10f3b94/bower.json#L3) and add a properly formatted entry to the [changelog](https://github.com/natgeo/mortar/blob/master/CHANGELOG.md) before deploying a new release.

[travis-image]: https://img.shields.io/travis/natgeo/mortar.svg?branch=master&style=flat-square
[travis-url]: https://travis-ci.org/natgeo/mortar
