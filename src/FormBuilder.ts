import Tag from './Tag.js';

export type InputOptions = Record<string, string | number> & {
  as?: 'textarea';
};

const fieldLabel = (name: string): string => name.charAt(0).toUpperCase() + name.slice(1);

export default class FormBuilder {
  private parts: string[] = [];

  constructor(private template: Record<string, unknown>) {}

  input(name: string, options: InputOptions = {}): void {
    if (!(name in this.template)) {
      throw new Error(`Field '${name}' does not exist in the template.`);
    }

    this.parts.push(
      new Tag('label', { for: name }, fieldLabel(name)).toString(),
    );

    const value = String(this.template[name]);
    const { as, ...rest } = options;

    if (as === 'textarea') {
      const attrs = {
        cols: 20,
        rows: 40,
        name,
        ...rest,
      };
      this.parts.push(new Tag('textarea', attrs, value).toString());
      return;
    }

    const attrs = {
      name,
      type: 'text',
      value,
      ...rest,
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
