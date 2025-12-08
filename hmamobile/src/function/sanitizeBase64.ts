export default function sanitizeBase64(base64: string) {
  return base64.replace(/^data:image\/\w+;base64,/, '');
}
