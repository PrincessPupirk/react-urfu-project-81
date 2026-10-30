import { describe, expect, test } from 'vitest';
import Tag from '../src/Tag';

describe('Tag', () => {
  test('single tag without attributes', () => {
    expect(new Tag('br').toString()).toBe('<br>');
  });

  test('single tag with attributes', () => {
    expect(new Tag('img', { src: 'path/to/image' }).toString()).toBe(
      '<img src="path/to/image">',
    );
    expect(new Tag('input', { type: 'submit', value: 'Save' }).toString()).toBe(
      '<input type="submit" value="Save">',
    );
  });

  test('paired tag with content', () => {
    expect(new Tag('label', {}, 'Email').toString()).toBe('<label>Email</label>');
    expect(new Tag('label', { for: 'email' }, 'Email').toString()).toBe(
      '<label for="email">Email</label>',
    );
    expect(new Tag('div').toString()).toBe('<div></div>');
  });
});
