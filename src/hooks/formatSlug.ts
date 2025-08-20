import type { FieldHook } from 'payload'

const format = (val: string): string => {
  if (!val || typeof val !== 'string') {
    return ''
  }

  return val
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .toLowerCase()
}

const formatSlug =
  (fallback: string): FieldHook =>
  ({ data, operation, originalDoc, value }) => {
    if (typeof value === 'string' && value) {
      return format(value)
    }

    if (operation === 'create') {
      const fallbackData = data?.[fallback] || originalDoc?.[fallback]

      if (fallbackData && typeof fallbackData === 'string' && fallbackData) {
        return format(fallbackData)
      }
    }

    return value
  }

export default formatSlug
