# @leostacowski/pkgs

Centralized package of reusable JavaScript tools.

[![npm version](https://img.shields.io/npm/v/@leostacowski/pkgs.svg)](https://www.npmjs.com/package/@leostacowski/pkgs)
[![license](https://img.shields.io/badge/license-Unlicense-blue.svg)](https://github.com/leostacowski/pkgs/blob/main/LICENSE)
[![node](https://img.shields.io/badge/node-%3E%3D22.12.0-brightgreen.svg)](https://nodejs.org/)

_"It's ugly but it's mine."_

— _Me describing my code._

## Table of Contents

- [Motivation](#motivation)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Modules](#modules)

## Motivation

After repeatedly starting things from scratch for a long time:

> I decided to finally create a centralized repo for my scripts.

This decision was directly inspired by Eskil Steenberg's talk: "_[You should finish your software](https://youtu.be/EGLoKbBn-VI?si=uFVlbKIcRolcOzCy)_".

If you are using any of these modules and something is breaking, or if you have a suggestion, please [open an issue](https://github.com/leostacowski/pkgs/issues/).

I intend to keep adding stuff to this repo as long as I continue to reinvent the wheel!

## Requirements

> `node >= 22.12.0` is a _safe choice_, but let me know your luck on older releases.

## Installation

```bash
npm i @leostacowski/pkgs
```

## Usage

Import what you need from the package root:

```js
import { Logger } from '@leostacowski/pkgs'
// or
const { Logger } = require('@leostacowski/pkgs')
```

Or import a single module and ignore the rest:

```js
import Fs from '@leostacowski/pkgs/fs'
// or
const Fs = require('@leostacowski/pkgs/fs').default
```

For usage details on each module, refer to [Modules](#modules).

---

## Modules

| Module   | What it does                                         | Docs                                                                              |
| -------- | ---------------------------------------------------- | --------------------------------------------------------------------------------- |
| `logger` | Aliases, types, colors and other knobs.              | [README](https://github.com/leostacowski/pkgs/blob/main/modules/logger/README.md) |
| `fs`     | Path checks, folder listing, file read/write/append. | [README](https://github.com/leostacowski/pkgs/blob/main/modules/fs/README.md)     |

---

[_Unlicense_](./LICENSE) — do whatever you want.
