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
```

Export type of the language file

```typescript
  // types.ts

  import { languageFiles } from './languageFiles';

  export type = typeof languageFiles;
```

Initialize it in the root component

```typescript
// Root.tsx

import { TranslatorProvider } from '@mertsolak/react-template';

import { languageFiles } from './languageFiles';

const Root = () => {
  const [currentLanguage, setCurrentLanguage] = useState('language1'); // Also redux can be used

  return (
    <TranslatorProvider languageFiles={languageFiles} languagePreference={currentLanguage}>
      <App />
    </TranslatorProvider>
  );
};

export default Root;
```

Use it anywhere

```typescript
// AnyComponent.tsx

import { useTranslator } from '@mertsolak/react-template';

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
