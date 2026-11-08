# @leostacowski/pkgs/fs

Small wrapper around [`node:fs/promises`](https://nodejs.org/api/fs.html#promises-api) for checking paths, listing folders, reading, writing and appending files.

> For the main package `@leostacowski/pkgs`: See the [main README.md](https://github.com/leostacowski/pkgs/blob/main/README.md).

## Table of Contents

- [Usage](#usage)
  - [Import](#import)
- [API](#api)
  - [path_exists(target)](#path_existstarget)
  - [is_file(target)](#is_filetarget)
  - [folder_list(target, options)](#folder_listtarget-options)
  - [file_read(target, options)](#file_readtarget-options)
  - [file_write(target, content)](#file_writetarget-content)
  - [file_append(target, content, options)](#file_appendtarget-content-options)
- [Examples](#examples)
  - [Check and list a folder](#check-and-list-a-folder)
  - [Read a file](#read-a-file)
  - [Write and append](#write-and-append)

## Usage

### Import

From `@leostacowski/pkgs`:

```js
import { Fs } from '@leostacowski/pkgs'
// or
const { Fs } = require('@leostacowski/pkgs')
```

Or straight from the source:

```js
import Fs from '@leostacowski/pkgs/fs'
// or
const Fs = require('@leostacowski/pkgs/fs').default
```

## API

### path_exists(target)

Checks whether the path exists. Files and folders both count, symlinks are followed, and a broken link is `false`.

```js
if (await Fs.path_exists(join(dir, 'package.json'))) {
  // ...
}
```

### is_file(target)

Checks whether the path is a regular file. Folders, missing paths and broken links are all `false`; a symlink to a file counts.

```js
if (await Fs.is_file(join(dir, 'package.json'))) {
  // ...
}
```

### folder_list(target, options)

Lists the entries of a folder:

```js
{
  path,        // full path of the entry
  inner_path,  // path relative to target, always starting with the separator
  name,        // entry name
  is_file,     // true for regular files and for symlinks that resolve to files
}
```

Here are the options and their defaults:

- `recursive` (boolean, default `false`) — walk subfolders;
- `files_only` (boolean, default `false`) — skip folders;
- `exclude` (array of strings or `RegExp`) — skip entries whose `inner_path` matches any pattern. Defaults to `.git` and `node_modules`; pass `[]` to keep everything;
- `include` (array of strings or `RegExp`, default `[]`) — when non-empty, keep only entries whose `inner_path` matches at least one pattern.

Patterns are strings or `RegExp`, and strings are compiled as regular expressions — remember to escape dots.

Missing folders and file targets return `[]`. Real errors, like a permission problem, still throw.

### file_read(target, options)

Reads the file and trims it. With `lines`, returns an array of non-empty lines instead. A missing path or a folder returns `''` (or `[]` with `lines`).

There's no extension check: if it's a file, it reads.

Here are the options and their defaults:

- `lines` (boolean, default `false`) — return an array of non-empty lines instead of a string;
- `split` (string, default `os.EOL`) — line separator used when `lines` is on. Pass `'\n'` for files written with LF on Windows;
- `remove` (array of strings or `RegExp`, default `[]`) — remove every match from the result. With `lines`, each line is stripped, trimmed and dropped when it becomes empty.

```js
const lines = await Fs.file_read(join(dir, 'README.md'), { lines: true, split: '\n' })
```

### file_write(target, content)

Writes `content`, replacing whatever was there. The parent folder must exist — nothing here creates directories.

Returns the path on success, `null` otherwise — folders and read-only files included. `content` is stringified before writing.

### file_append(target, content, options)

Appends `content` plus `options.eol` (`os.EOL` by default). Same return rules as `file_write`.

- No separator is added before `content`: appending to a file that does not end with a newline joins the new text onto the last line;
- Pass `eol: ''` to append without a trailing line break.

## Examples

### Check and list a folder

```js
import Fs from '@leostacowski/pkgs/fs'
import { join } from 'node:path'

const dir = join(process.cwd(), 'modules')

if (await Fs.path_exists(dir)) {
  const entries = await Fs.folder_list(dir, { recursive: true, files_only: true })

  for (const entry of entries) {
    console.log(entry.inner_path)
  }
}
```

On Windows, that prints:

```text
\index.js
\fs\index.js
\fs\README.md
\logger\index.js
\logger\README.md
```

### Read a file

```js
const dir = process.cwd()

const content = await Fs.file_read(join(dir, 'package.json'))
const lines = await Fs.file_read(join(dir, 'README.md'), { lines: true, split: '\n' })
```

### Write and append

```js
const file = join(process.cwd(), 'notes.txt')

await Fs.file_write(file, 'first\n')
await Fs.file_append(file, 'second')

const lines = await Fs.file_read(file, { lines: true, split: '\n' })
// [ 'first', 'second' ]
```
