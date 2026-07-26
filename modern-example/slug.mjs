export function slug(value) {
  if (typeof value !== 'string' || !value.trim()) throw new TypeError('value must be a non-empty string');
  return value.trim().toLowerCase().replaceAll(/[^\p{L}\p{N}]+/gu, '-').replaceAll(/^-|-$/g, '');
}
