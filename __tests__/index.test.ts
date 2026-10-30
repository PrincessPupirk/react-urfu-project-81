import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, test } from 'vitest';
import HexletCode from '../src/index';

const template = { name: 'rob', job: 'hexlet', gender: 'm' };

const fixture = (filename: string): string => readFileSync(
  path.join(path.dirname(fileURLToPath(import.meta.url)), '__fixtures__', filename),
  'utf-8',
).trim();

describe('HexletCode.formFor', () => {
  test('returns empty form with default action and method', () => {
    const form = HexletCode.formFor(template, {}, () => {});

    expect(form).toBe('<form method="post" action="#"></form>');
  });

  test('uses url option as form action', () => {
    const form = HexletCode.formFor(template, { url: '/users' }, () => {});

    expect(form).toBe('<form method="post" action="/users"></form>');
  });

  test('generates text inputs and textarea from template', () => {
    const form = HexletCode.formFor(template, { method: 'post' }, (f) => {
      f.input('name');
      f.input('job', { as: 'textarea' });
    });

    expect(form).toBe(fixture('form-with-inputs.html'));
  });

  test('passes extra attributes to fields', () => {
    const form = HexletCode.formFor(template, {}, (f) => {
      f.input('name', { class: 'user-input' });
      f.input('job');
    });

    expect(form).toBe(fixture('form-with-extra-attrs.html'));
  });

  test('uses default textarea size', () => {
    const form = HexletCode.formFor(template, {}, (f) => {
      f.input('job', { as: 'textarea' });
    });

    expect(form).toBe(fixture('form-textarea-defaults.html'));
  });

  test('allows overriding textarea rows and cols', () => {
    const form = HexletCode.formFor(template, { url: '#' }, (f) => {
      f.input('job', { as: 'textarea', rows: 50, cols: 50 });
    });

    expect(form).toBe(fixture('form-textarea-custom-size.html'));
  });

  test('throws when field is missing in template', () => {
    expect(() => {
      HexletCode.formFor(template, { url: '/users' }, (f) => {
        f.input('name');
        f.input('job', { as: 'textarea' });
        f.input('age');
      });
    }).toThrow("Field 'age' does not exist in the template.");
  });

  test('adds labels and default submit button', () => {
    const form = HexletCode.formFor(template, { method: 'post' }, (f) => {
      f.input('name');
      f.input('job');
      f.submit();
    });

    expect(form).toBe(fixture('form-with-submit.html'));
  });

  test('allows custom submit button text', () => {
    const form = HexletCode.formFor(template, { method: 'post' }, (f) => {
      f.input('name');
      f.input('job');
      f.submit('Wow');
    });

    expect(form).toBe(fixture('form-with-custom-submit.html'));
  });

  test('supports custom label text and label attributes', () => {
    const form = HexletCode.formFor(template, { method: 'post' }, (f) => {
      f.input('name', {
        label: 'User',
        labelHtml: { class: 'form-label', id: 'name-label' },
      });
      f.submit('Ok');
    });

    expect(form).toBe(
      '<form method="post" action="#"><label for="name" class="form-label" id="name-label">User</label><input name="name" type="text" value="rob"><input type="submit" value="Ok"></form>',
    );
  });
});
