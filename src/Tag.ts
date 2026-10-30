const SINGLE_TAGS = new Set(['br', 'img', 'input']);

type TagAttrs = Record<string, string | number>;

export default class Tag {
  name: string;

  attrs: TagAttrs;

  content: string;

  constructor(name: string, attrs: TagAttrs = {}, content = '') {
    this.name = name;
    this.attrs = attrs;
    this.content = content;
  }

  toString(): string {
    const attrsString = Object.entries(this.attrs)
      .map(([key, value]) => `${key}="${value}"`)
      .join(' ');

    if (SINGLE_TAGS.has(this.name)) {
      return attrsString ? `<${this.name} ${attrsString}>` : `<${this.name}>`;
    }

    return attrsString
      ? `<${this.name} ${attrsString}>${this.content}</${this.name}>`
      : `<${this.name}>${this.content}</${this.name}>`;
  }
}
