# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

*

### Changed

* Bumped dependencies
* Migrate to webpack 5
* Remove Travis CI - [products/#97](https://github.com/ripe-tech/products/issues/97)

### Fixed

* Fix storybook dependency problem after minor bump, lock versions to minor - [ripe-welcome/PR#187](https://github.com/ripe-tech/ripe-welcome/pull/187)
* Fix eslint dependencies problems

## [0.2.3] - 2021-04-06

### Changed

* Changing the model of a `ripe-configurator` triggers a configuration change using the `parts` from props
