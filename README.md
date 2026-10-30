# Генератор форм на Typescript

[![hexlet-check](https://github.com/PrincessPupirk/react-urfu-project-81/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/PrincessPupirk/react-urfu-project-81/actions)
[![Typescript CI](https://github.com/PrincessPupirk/react-urfu-project-81/actions/workflows/typescript.yml/badge.svg)](https://github.com/PrincessPupirk/react-urfu-project-81/actions/workflows/typescript.yml)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=PrincessPupirk_react-urfu-project-81&metric=coverage)](https://sonarcloud.io/summary/new_code?id=PrincessPupirk_react-urfu-project-81)

Библиотека, с помощью которой удобно создавать формы в шаблонах сайтов. Она заметно сокращает код описания формы за счет автоматической обработки ошибок и различных контролов.

Учебный проект Хекслета: https://ru.hexlet.io/


## Стек

- TypeScript
- ESLint
- Vitest

## Установка

```bash
git clone https://github.com/PrincessPupirk/react-urfu-project-81.git
cd react-urfu-project-81
make install
```

## Команды

```bash
make lint           # ESLint
make test           # Vitest
make test-coverage  # Vitest + покрытие (порог 80%)
make typecheck      # проверка типов
make build          # сборка в dist/
```

## Использование

```javascript
import HexletCode from '@hexlet/code';

const template = { name: 'rob', job: 'hexlet', gender: 'm' };
const form = HexletCode.formFor(template, { method: 'post' }, (f) => {
  f.input('name');
  f.input('job', { as: 'textarea' });
  f.submit('Wow');
});

console.log(form);
// <form method="post" action="#"><label for="name">Name</label>...
```

---

<details>
<summary>Автоматические тесты Хекслета</summary>

Тесты запускаются на каждый коммит. За запуск отвечает файл `.github/workflows/hexlet-check.yml` — не удаляйте и не переименовывайте ни его, ни репозиторий.

</details>

## О Хекслете

[Хекслет](https://ru.hexlet.io/) — школа программирования: авторские программы обучения с практикой, поддержкой наставников и реальными проектами, которые остаются в резюме. Этот репозиторий — один из таких проектов.
