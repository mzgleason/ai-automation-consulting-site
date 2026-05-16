function stripDisallowedAttributes(raw: string): string {
  return raw
    .replace(/\son[a-z]+=\"[^\"]*\"/gi, "")
    .replace(/\son[a-z]+='[^']*'/gi, "")
    .replace(/\son[a-z]+=[^\s>]+/gi, "")
    .replace(/\sstyle=\"[^\"]*\"/gi, "")
    .replace(/\sstyle='[^']*'/gi, "")
    .replace(/\shref=\"javascript:[^\"]*\"/gi, ' href="#"')
    .replace(/\shref='javascript:[^']*'/gi, " href='#'");
}

export function sanitizeHtml(html: string): string {
  return stripDisallowedAttributes(html)
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
    .replace(/<iframe[\s\S]*?>[\s\S]*?<\/iframe>/gi, "")
    .replace(/<object[\s\S]*?>[\s\S]*?<\/object>/gi, "")
    .replace(/<embed[\s\S]*?>[\s\S]*?<\/embed>/gi, "")
    .replace(/<link[^>]*>/gi, "")
    .replace(/<meta[^>]*>/gi, "");
}