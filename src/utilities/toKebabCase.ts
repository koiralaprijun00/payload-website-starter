export const toKebabCase = (string: string): string => {
  if (!string || typeof string !== 'string') {
    return ''
  }
  
  return string
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase()
}
