const LOGGER_COLORS = {
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

const LOGGER_TYPES = [
  {
    level: 2,
    prefix: 'ERROR',
    emitter: console.error,
    color: LOGGER_COLORS.RED,
    aliases: ['error', 'err', 'e'],
  },
  {
    level: 1,
    prefix: 'WARNING',
    emitter: console.warn,
    color: LOGGER_COLORS.YELLOW,
    aliases: ['warning', 'warn', 'w'],
  },
  {
    level: 0,
    prefix: 'SUCCESS',
    emitter: console.log,
    color: LOGGER_COLORS.GREEN,
    aliases: ['success', 's'],
  },
  {
    level: 0,
    prefix: 'DEBUG',
    emitter: console.log,
    color: LOGGER_COLORS.DEFAULT,
    aliases: ['log', 'info', 'debug', 'l', 'i', 'd'],
  },
]

const BASE_OPTS = {
  prefix: '',
  group: true,
  colors: true,
  text_color: '',
  level: 0,
}

function emit(content = [], opts = {}, logger_type = {}) {
  if (opts?.level > logger_type.level) return
  if (!content.length) return

  const prefix = (() => {
    const target = []

    target.push(`> [${new Date().toISOString()}] ${logger_type.prefix}`)

    if (opts?.prefix) {
      target.push(opts.prefix)
    }

    target[target.length - 1] = `${target[target.length - 1]}:`

    if (opts?.colors) {
      target.unshift(logger_type.color.code)
      target.push(LOGGER_COLORS.RESET.code)
    }

    return target.join(' ')
  })()

  const message = (() => {
    const target = []
    let text_color = ''

    for (const item of content) {
      target.push(typeof item === 'string' ? item : JSON.stringify(item))
    }

    if (opts?.colors && opts?.text_color) {
      text_color = opts.text_color
    }

    if (text_color) {
      return `${text_color}${target.join()}${LOGGER_COLORS.RESET.code}`
    }

    return target.join(' ')
  })()

  if (opts.group) {
    console.group(prefix)
    logger_type.emitter(message)
    console.groupEnd()
  } else {
    logger_type.emitter(prefix, message)
  }

  return
}

function get_emitters(args) {
  const opts = {}

  Object.keys(BASE_OPTS).forEach((key) => {
    if (typeof args?.[key] === typeof BASE_OPTS[key]) {
      opts[key] = args[key]
    } else {
      opts[key] = BASE_OPTS[key]
    }
  })

  const target = {}

  for (const logger_type of LOGGER_TYPES) {
    for (const alias of logger_type.aliases) {
      target[alias] = function () {
        return emit(Array.from(arguments), opts, logger_type)
      }
    }
  }

  return target
}

const Logger = function (args) {
  if (typeof args === 'string') {
    args = {
      prefix: args,
    }
  }

  const emitters = get_emitters(args)
  const methods = {}

  for (const emitter of Object.keys(emitters)) {
    methods[emitter] = emitters[emitter]
  }

  return methods
}

export default Logger
