# @leostacowski/pkgs/logger

A simple logger that supports aliases, types, colors and other knobs.

> For the main package `@leostacowski/pkgs`: See the [main README.md](https://github.com/leostacowski/pkgs/blob/main/README.md).

## Table of Contents

- [Usage](#usage)
  - [Import](#import)
- [Options](#options)
  - [_prefix_: `string`](#prefix-string)
  - [_group_: `boolean`](#group-boolean)
  - [_colors_: `boolean`](#colors-boolean)
  - [_text_color_: `string`](#text_color-string)
  - [_level_: `number`](#level-number)
- [Types](#types)
- [Examples](#examples)
  - [Basic](#basic)
  - [Prefix](#prefix)
  - [Same Line](#same-line)
  - [Level Filtering](#level-filtering)

## Usage

### Import

From `@leostacowski/pkgs`:

```js
import { Logger } from '@leostacowski/pkgs'
// or
const { Logger } = require('@leostacowski/pkgs')
```

Or straight from the source:

```js
import Logger from '@leostacowski/pkgs/logger'
// or
const Logger = require('@leostacowski/pkgs/logger').default
```

## Options

When calling `Logger()`, you can customize your instance. Here are the defaults:

```js
const logger = Logger({
  prefix: '',
  group: true,
  colors: true,
  text_color: '',
  level: 0,
})
```

Alternatively, pass a single `string` argument to set just `prefix`:

```js
const logger = Logger('My prefix 😉')
```

You could just ignore everything:

```js
const logger = Logger()
```

Options are type-checked: a value of the wrong type falls back to its default.

### _prefix_: `string`

Defines a value to append to the output prefix.

### _group_: `boolean`

Toggles the use of [group](https://nodejs.org/api/console.html#consolegrouplabel) and [groupEnd](https://nodejs.org/api/console.html#consolegroupend).

If `true`, the whole computed prefix — timestamp, type and [_prefix_](#prefix-string) — becomes the group label.

### _colors_: `boolean`

Toggles the use of [ANSI colors](https://en.wikipedia.org/wiki/ANSI_escape_code) on console output. Here are the defaults:

```js
{
  RED: {
    code: '\x1b[91m',
  },
  GREEN: {
    code: '\x1b[92m',
  },
  YELLOW: {
    code: '\x1b[93m',
  },
  DEFAULT: {
    code: '\x1b[94m',
  },
  RESET: {
    code: '\x1b[0m',
  },
}
```

### _text_color_: `string`

Specify your own ANSI color code for console output text.

If [colors](#colors-boolean) is `false`, this option is ignored.

### _level_: `number`

One of:

- `0`: Allows [ `DEBUG`, `SUCCESS`, `WARNING`, `ERROR` ]
- `1`: Allows [ `WARNING`, `ERROR` ]
- `2`: Allows [ `ERROR` ]

## Types

The logger supports four types of output:

- **DEBUG**;
- **SUCCESS**;
- **WARNING**;
- **ERROR**.

Each type is aliased to support multiple ways of being emitted:

- **DEBUG**:
  - `log`;
  - `info`;
  - `debug`;
  - `l`;
  - `i`;
  - `d`.
- **SUCCESS**:
  - `success`;
  - `s`.
- **WARNING**:
  - `warning`;
  - `warn`;
  - `w`.
- **ERROR**:
  - `error`;
  - `err`;
  - `e`.

This means that all of this is fair game:

```js
logger.log('"log" emits DEBUG')
logger.info('"info" emits DEBUG')
logger.debug('"debug" emits DEBUG')
logger.l('"l" emits DEBUG')
logger.i('"i" emits DEBUG')
logger.d('"d" emits DEBUG')
logger.success('"success" emits SUCCESS')
logger.s('"s" emits SUCCESS')
logger.warning('"warning" emits WARNING')
logger.warn('"warn" emits WARNING')
logger.w('"w" emits WARNING')
logger.error('"error" emits ERROR')
logger.err('"err" emits ERROR')
logger.e('"e" emits ERROR')
```

## Examples

### Basic

```js
import Logger from '@leostacowski/pkgs/logger'

const logger = Logger()

logger.log('Hello World!')
```

Outputs:

```text
 > [2026-11-07T04:30:28.965Z] DEBUG:
  Hello World!
```

### Prefix

```js
import Logger from '@leostacowski/pkgs/logger'

const logger = Logger('Hello')

logger.warn('World!')
```

Outputs:

```text
 > [2026-11-07T05:23:15.708Z] WARNING Hello:
  World!
```

### Same Line

```js
import Logger from '@leostacowski/pkgs/logger'

const logger = Logger({
  group: false,
})

logger.info('Hello World!')
```

Outputs:

```text
 > [2026-11-07T05:25:23.193Z] DEBUG: Hello World!
```

### Level Filtering

```js
import Logger from '@leostacowski/pkgs/logger'

const logger = Logger({
  level: 2,
})

logger.log('0')
logger.warn('1')
logger.error('2')
```

Outputs:

```text
 > [2026-11-07T05:30:44.055Z] ERROR:
  2
```
