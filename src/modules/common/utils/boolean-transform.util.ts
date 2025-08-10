export function booleanTransform(value: any): boolean | undefined {
  const str = String(value).toLowerCase()
  if (['false', '0'].includes(str)) return false
  if (['true', '1'].includes(str)) return true
  return undefined
}
