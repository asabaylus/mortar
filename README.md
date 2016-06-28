# Mortar 2.0

NGP foundational framework

## Environment Instructions

1. Install Homebrew (the missing package manager): `ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
- Install Git: `brew install Git`
- Add your SSH Key to Github: [https://help.github.com/articles/generating-an-ssh-key/]()
- Install NVM (Node Version Manager): `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.29.0/install.sh | bash`
- Install Node.js: `nvm install v5.6.0`
- Install Gulp globally: `npm install --global gulp`
- Clone Repo: `git clone git@github.com:natgeo/mortar.git`
- Change directory to the repository: `cd ~/code/mortar`
- Set Node version (it will respect the .nvmrc file in the repo): `nvm use`
- Install packages: `npm install`
- Run project: `gulp serve`

## Gulp Tasks

### `gulp serve`

This is the most common task a developer will run. `gulp serve` will open the documentation site at the root and continue to run a watch task. `gulp serve --start [path]` or `gulp serve -s [path]` will open the documentation site at the specified path. For example `gulp serve --start icons` will open directly to the icons page at `http://localhost:3000/icons/`.

### `gulp build`

This task will build a *development* version of documentation site with no watch task.

### `gulp build -p` or `gulp build --production`

This task will build a *production* version of documentation site with no watch task.

### Test URL's

http://assets-qa.int.ngeo.com/mortar2/latest/site/
