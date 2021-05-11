import { ErrorsEnum } from '@enums/errors.enum';

export type LanguageFiles = Record<string, Record<string, Record<string, string>>>;

export interface State {
  languageFiles: LanguageFiles;
  languagePreference: keyof LanguageFiles;
}

export type CustomErrorType = keyof typeof ErrorsEnum;

export type TranslatorContextValue = {
  languageFiles: LanguageFiles;
  languagePreference: keyof LanguageFiles;
  setLanguageFiles: (newLanguageFiles: LanguageFiles) => void;
  setLanguagePreference: (newLanguagePreference: keyof LanguageFiles) => void;
};

export type Action =
  | {
      type: 'SET_LANGUAGE_FILES';
      payload: State['languageFiles'];
    }
  | {
      type: 'SET_LANGUAGE_PREFERENCE';
      payload: State['languagePreference'];
    };

export type Props = State;
