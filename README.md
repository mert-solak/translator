## Translator

Lightweight translator to switch between multiple language files with **auto complete** and **input validation** for React.

![npm](https://img.shields.io/npm/v/@mertsolak/translator)
![license](https://img.shields.io/npm/l/@mertsolak/translator)
![size](https://img.shields.io/bundlephobia/min/@mertsolak/translator)
![issue](https://img.shields.io/github/issues/mert-solak/translator)

## Installation

Use node package manager to install @mertsolak/translator

```bash
npm i @mertsolak/translator
```

## Basic Usage

Create a language file

```typescript
  // languageFiles.ts

  export const languageFiles = {
    language1: {
      homePage: {
        title: 'title',
      }
    }
    language2: {
      homePage: {
        title: 'title'
      }
    }
  };

  export const options = {
    validateLanguageFiles: true
  };
```

Export type of the language file

```typescript
// types.ts

import { languageFiles } from './languageFiles';

export type LanguageFiles = typeof languageFiles;
```

Initialize it in the root component

```typescript
// Root.tsx

import { useState } from 'react';

import { TranslatorProvider } from '@mertsolak/translator';

import { languageFiles, options } from './languageFiles';

const Root = () => {
  const [currentLanguage, setCurrentLanguage] = useState('language1'); // Also redux can be used

  return (
    <TranslatorProvider languageFiles={languageFiles} languagePreference={currentLanguage} options={options}>
      <App />
    </TranslatorProvider>
  );
};

export default Root;
```

Use it everywhere

```typescript
// AnyComponent.tsx

import { useTranslator } from '@mertsolak/translator';

import { LanguageFiles } from './types'; // Type is needed for auto completion

const HomePage = () => {
  const translator = useTranslator<LanguageFiles>('homePage');

  return (
    <div>
      <p>{translator.title}</p>
    </div>
  );
};

export default HomePage;
```

## Additional

languageFiles and languagePreference can be updated in everywhere.

```typescript
// HomePage.tsx

import { useEffect, useState, useContext } from 'react';

import { TranslatorContext } from '@mertsolak/translator';

import { newLanguageFiles } from './newLanguageFiles';

const HomePage = () => {
  const [newLanguagePreference, setNewLanguagePreference] = useState('language1');

  const { setLanguageFiles, setLanguagePreference } = useContext(TranslatorContext);

  useEffect(() => {
    setLanguageFiles(newLanguageFiles);
    setLanguagePreference(newLanguagePreference);
  }, []);

  return <p>Home Page</p>;
};

export default HomePage;
```
