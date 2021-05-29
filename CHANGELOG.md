# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.4.1] - 2021-05-29

- Add `gunicorn` to Django pipfile
- Fix production database variable (must be a list instead of a string)
- Correctly generate `.gitignore` for Django template

## [3.4.0] - 2021-05-29

- Create superuser for Django project
- Remove create superuser script once it's been used
- Disallow use of hyphens in project name (not permitted by Django)
- Generate readme files for all projects

## [3.3.0] - 2021-05-28

- Run initial migrations for Django project
- Display post-install helper message to start server per framework

## [3.2.2] - 2021-05-28

- Improve Regex to check for valid directory name
- Further optimize centralization of color variables

## [3.2.1] - 2021-05-28

- Fix `.vscode` folder not being copied to Django template

## [3.2.0] - 2021-05-28

- Use keywords to colorize menus
- Use `gradient-string` for the titles
- Bump versions of reactive dependencies
- Extract all color variables to centralized object
- Validate for correct project name

## [3.1.0] - 2021-05-27

- Refactor: script now uses just a single default installer function with parameters
- Goodbye function now uses the colors of the framework installed

## [3.0.0] - 2021-05-27

- Script is crossplatform: it relies on pip3 to install pipenv if not present, rather than Homebrew
- De-structure variables in installer helpers
- Refactor the install menu
- Improve main menu visually
- Improve goodbye function
- Streamline help
- Convert cascading if statements to tertiary conditional

## [2.2.0] - 2021-05-27

- Fix generation of .gitignore files

## [2.1.0] - 2021-05-27

- Fix issue of recursive virtual environments
- Correctly copy `.gitignore` files (use `clobber: true` with `ncp`)

## [2.0.0] - 2021-05-27

- Installs are async
- Install all boilerplates from templates (no need for jq and long commands to modify package.json)
- Use `listr` to display current progress
- Use `ncp` to asynchronous recursive copy of templates

## [1.6.0] - 2021-05-23

- Rename to "frames"
- Improve menu performance

## [1.5.0] - 2021-05-23

- Colorize variables depending on chosen framework
- Improvements on the splash screen
- Improvements on the help text

## [1.4.3] - 2021-05-23

- Pass framework as a variable between menu and functions

## [1.4.0] - 2021-05-22

- Add figlet to deal with the menu
- improve menus

## [1.3.6] - 2021-05-22

- Add list separators

## [1.3.1] - 2021-05-22

- Improve menus and messages

## [1.3.0] - 2021-05-22

- Properly create binary

## [1.2.0] - 2021-05-22

- Create bin and linked

## [1.1.0] - 2021-05-22

- Add Changelog
- Add License
- Add Contributing document
- Add Readme information

## [1.0.0] - 2021-05-22

- Initial Release
