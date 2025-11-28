let CLASS_PREFIX = 'zephyr-'

export function getClassPrefix() {
  return CLASS_PREFIX
}

export function setClassPrefix(prefix: string) {
  CLASS_PREFIX = prefix
}

export function withPrefix(name: string) {
  return `${CLASS_PREFIX}${name}`
}
