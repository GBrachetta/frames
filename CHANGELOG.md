# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
