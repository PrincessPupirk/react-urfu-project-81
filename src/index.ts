import Tag from './Tag.js';
import FormBuilder from './FormBuilder.js';

type FormOptions = {
  url?: string;
  method?: string;
};

export default class HexletCode {
  static formFor(
    template: Record<string, unknown>,
    options: FormOptions,
    callback: (f: FormBuilder) => void,
  ): string {
    const action = options.url ?? '#';
    const method = options.method ?? 'post';
    const builder = new FormBuilder(template);

    callback(builder);

    return new Tag('form', { action, method }, builder.buildContent()).toString();
  }
}

export { FormBuilder };
