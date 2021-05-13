import { ErrorsEnum } from '../enums/errors.enum';

export type LanguageFiles = Record<string, Record<string, Record<string, string>>>;

export interface Options {
  validateLanguageFiles: boolean;
}

export interface State {
  languageFiles: LanguageFiles;
  languagePreference: keyof LanguageFiles;
  options: Options;
}

export type CustomErrorType = keyof typeof ErrorsEnum;

export type TranslatorContextValue = {
  languageFiles: State['languageFiles'];
  languagePreference: State['languagePreference'];
  options: State['options'];
  setLanguageFiles: (newLanguageFiles: State['languageFiles']) => void;
  setLanguagePreference: (newLanguagePreference: State['languagePreference']) => void;
  setOptions: (newOptions: State['options']) => void;
};

export type Action =
  | {
      type: 'SET_LANGUAGE_FILES';
      payload: State['languageFiles'];
    }
  | {
      type: 'SET_LANGUAGE_PREFERENCE';
      payload: State['languagePreference'];
    }
  | {
      type: 'SET_OPTIONS';
      payload: State['options'];
    };

export type Props = State;
