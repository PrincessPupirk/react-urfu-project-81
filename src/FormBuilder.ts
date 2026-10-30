import Tag from './Tag.js';

export type InputOptions = Record<string, unknown> & {
  as?: 'textarea';
  label?: string;
  labelHtml?: Record<string, string | number>;
};

const fieldLabel = (name: string): string => name.charAt(0).toUpperCase() + name.slice(1);

export default class FormBuilder {
  private parts: string[] = [];

  constructor(private template: Record<string, unknown>) {}

  input(name: string, options: InputOptions = {}): void {
    if (!(name in this.template)) {
      throw new Error(`Field '${name}' does not exist in the template.`);
    }

    const {
      as, label, labelHtml, ...rest
    } = options;
    const fieldAttrs = rest as Record<string, string | number>;

    const labelAttrs = { for: name, ...(labelHtml ?? {}) };
    const labelText = label ?? fieldLabel(name);
    this.parts.push(new Tag('label', labelAttrs, labelText).toString());

    const value = String(this.template[name]);

    if (as === 'textarea') {
      const attrs = {
        cols: 20,
        rows: 40,
        name,
        ...fieldAttrs,
      };
      this.parts.push(new Tag('textarea', attrs, value).toString());
      return;
    }

    const attrs = {
      name,
      type: 'text',
      value,
      ...fieldAttrs,
    };
    this.parts.push(new Tag('input', attrs).toString());
  }

  submit(buttonText = 'Save'): void {
    this.parts.push(new Tag('input', { type: 'submit', value: buttonText }).toString());
  }

  buildContent(): string {
    return this.parts.join('');
  }
}
