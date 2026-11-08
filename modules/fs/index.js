import { EOL } from 'node:os'
import { sep, dirname, join, relative } from 'node:path'
import { stat, opendir, readFile, writeFile, appendFile } from 'node:fs/promises'

const get_regexp = function (pattern, global = false) {
  const source = pattern instanceof RegExp ? pattern.source : String(pattern)
  const flags = new Set(pattern instanceof RegExp ? pattern.flags : '')

  if (global) {
    flags.add('g')
  } else {
    flags.delete('g')
    flags.delete('y')
  }

  return new RegExp(source, [...flags].join(''))
}

const path_exists = async function (target = '') {
  const target_path = String(target).trim()

  return stat(target_path)
    .then(() => true)
    .catch(() => false)
}

const is_file = function (target = '') {
  const target_path = String(target).trim()

  return stat(target_path)
    .then((value) => value.isFile())
    .catch(() => false)
}

const folder_list = async function (target = '', args) {
  const target_path = String(target).trim()

  const [file, exists] = await Promise.all([
    is_file(target_path),
    path_exists(target_path),
  ])

  if (file || !exists) {
    return []
  }

  let { recursive = null, files_only = null, exclude = null, include = null } = args || {}

  if (typeof recursive !== 'boolean') {
    recursive = false
  }

  if (typeof files_only !== 'boolean') {
    files_only = false
  }

  if (!Array.isArray(exclude)) {
    const path_separator = sep.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

    exclude = [
      new RegExp(`${path_separator}[.]git(${path_separator}|$)`),
      new RegExp(`${path_separator}node_modules(${path_separator}|$)`),
    ]
  }

  if (!Array.isArray(include)) {
    include = []
  }

  exclude = exclude.map((pattern) => get_regexp(pattern))
  include = include.map((pattern) => get_regexp(pattern))

  const dirents = await opendir(target_path, {
    recursive,
  })

  const output = []

  for await (const dirent of dirents) {
    const path = join(dirent.parentPath, dirent.name)
    const inner_path = `${sep}${relative(target_path, path)}`

    let file = dirent.isFile()

    if (dirent.isSymbolicLink()) {
      file = await is_file(path)
    }

    if (files_only && !file) {
      continue
    }

    if (exclude.length && exclude.some((pattern) => pattern.test(inner_path))) {
      continue
    }

    if (include.length && !include.some((pattern) => pattern.test(inner_path))) {
      continue
    }

    output.push({
      path,
      inner_path,
      name: dirent.name,
      is_file: file,
    })
  }

  return output
}

const file_read = async function (target = '', args) {
  const file_path = String(target).trim()

  let { lines = null, split = null, remove = null } = args || {}

  if (typeof lines !== 'boolean') {
    lines = false
  }

  const [file, exists] = await Promise.all([is_file(file_path), path_exists(file_path)])

  if (!file || !exists) {
    return lines ? [] : ''
  }

  if (typeof split !== 'string') {
    split = EOL
  }

  if (!Array.isArray(remove)) {
    remove = []
  }

  const patterns = remove.map((pattern) => get_regexp(pattern, true))

  let output = await readFile(file_path, 'utf8').catch(() => '')

  output = output.trim()

  if (!lines) {
    for (const pattern of patterns) {
      output = output.replace(pattern, '')
    }

    return output.trim()
  }

  let output_lines = output.split(split).filter(Boolean)

  if (patterns.length) {
    output_lines = output_lines
      .map((line) => {
        let value = line

        for (const pattern of patterns) {
          value = value.replace(pattern, '')
        }

        return value.trim()
      })
      .filter(Boolean)
  }

  return output_lines
}

const file_write = async function (target = '', content) {
  const file_path = String(target).trim()

  if (!(await path_exists(dirname(file_path)))) {
    return null
  }

  const written = await writeFile(file_path, String(content))
    .then(() => true)
    .catch(() => false)

  if (!written || !(await is_file(file_path))) {
    return null
  }

  return file_path
}

const file_append = async function (target = '', content, args) {
  const file_path = String(target).trim()

  if (!(await path_exists(dirname(file_path)))) {
    return null
  }

  let { eol = null } = args || {}

  if (typeof eol !== 'string') {
    eol = EOL
  }

  let line = String(content)

  if (eol) {
    line = `${line}${eol}`
  }

  const appended = await appendFile(file_path, line)
    .then(() => true)
    .catch(() => false)

  if (!appended || !(await is_file(file_path))) {
    return null
  }

  return file_path
}

const Fs = {
  path_exists,
  is_file,
  folder_list,
  file_read,
  file_write,
  file_append,
}

export default Fs
