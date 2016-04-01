# Mortar 2.0

NGP foundational framework

1. Install Homebrew (the missing package manager): `ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
- Install Git: `brew install Git`
- Add your SSH Key to Github: [https://help.github.com/articles/generating-an-ssh-key/]()
- Install NVM (Node Version Manager): `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.29.0/install.sh | bash`
- Install Node.js: `nvm install v5.6.0`
- Install Gulp globally: `npm install --global gulp`
- Clone Repo: `git clone git@github.com:natgeo/mortar.git`
- Change directory to the repository: `cd ~/code/mortar`
- Checkout "release/2.0" branch: `git checkout release/2.0`
- Set Node version (it will respect the .nvmrc file in the repo): `nvm use`
- Install packages: `npm install`
- Run project: `gulp serve`
