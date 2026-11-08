# @leostacowski/pkgs

_"It's ugly but it's mine."_

\- _Me describing my code._

## Table of Contents

- [Motivation](#motivation)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Modules](#modules)
  - [@leostacowski/pkgs/logger](#leostacowskipkgslogger)
  - [@leostacowski/pkgs/fs](#leostacowskipkgsfs)

## Motivation

After repeatedly starting things from scratch for a long time:

```text
I decided to finally create a centralized repo for my scripts.
```

This decision was directly inspired by Eskil Steenberg's talk: "_[You should finish your software](https://youtu.be/EGLoKbBn-VI?si=uFVlbKIcRolcOzCy)_".

If you are using any of these modules and something is breaking, or if you have a suggestion, please [open an issue](https://github.com/leostacowski/pkgs/issues/).

I intend to keep adding stuff to this repo as long as I continue to reinvent the wheel!

## Requirements

`node >= 22.12.0` is a _safe choice_, but let me know your luck on older releases.

## Installation

```bash
npm i @leostacowski/pkgs
```

## Usage

Everything begins at the `@leostacowski/pkgs` package:

```js
import pkgs from '@leostacowski/pkgs'
// or
const pkgs = require('@leostacowski/pkgs').default
```

Then import what you need:

```js
import { ModuleX } from '@leostacowski/pkgs'
// or
const { ModuleX } = require('@leostacowski/pkgs')
```

Or import a specific module and ignore the rest:

```js
import ModuleY from '@leostacowski/pkgs/ModuleY'
// or
const ModuleY = require('@leostacowski/pkgs/ModuleY')
```

For usage details on each module, refer to [Modules](#modules).

## Modules

### @leostacowski/pkgs/logger

A simple logger that supports aliases, types, colors and other knobs.

- _README_: [modules/logger/README.md](https://github.com/leostacowski/pkgs/blob/main/modules/logger/README.md).

### @leostacowski/pkgs/fs

Wrapper for basic Node.js [fs/promises](https://nodejs.org/api/fs.html#promises-api) operations.

- _README_: [modules/fs/README.md](https://github.com/leostacowski/pkgs/blob/main/modules/fs/README.md).
