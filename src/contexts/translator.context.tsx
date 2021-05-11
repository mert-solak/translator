import React, { createContext, useEffect, useReducer } from 'react';

import { LanguageFiles, Props, State, Action, TranslatorContextValue } from '@interfaces/main.interface';

const initialState: State = {
  languageFiles: undefined,
  languagePreference: undefined,
};

const translatorContextValue: TranslatorContextValue = {
  ...initialState,
  setLanguageFiles: () => {},
  setLanguagePreference: () => {},
};

export const TranslatorContext = createContext(translatorContextValue);

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_LANGUAGE_FILES':
      return { ...state, languageFiles: { ...action.payload } };
    case 'SET_LANGUAGE_PREFERENCE':
      return { ...state, languagePreference: action.payload };

    default:
      return state;
  }
};

export const TranslatorProvider: React.FC<Props> = ({ children, languageFiles, languagePreference }) => {
  const [state, dispatch] = useReducer(reducer, { ...initialState, languageFiles, languagePreference });

  const setLanguageFiles = (newLanguageFiles: LanguageFiles) =>
    dispatch({ type: 'SET_LANGUAGE_FILES', payload: newLanguageFiles });
  const setLanguagePreference = (newLanguagePreference: keyof LanguageFiles) =>
    dispatch({ type: 'SET_LANGUAGE_PREFERENCE', payload: newLanguagePreference });

  useEffect(() => {
    setLanguagePreference(languagePreference);
  }, [languagePreference]);

  useEffect(() => {
    setLanguageFiles(languageFiles);
  }, [languageFiles]);

  return (
    <TranslatorContext.Provider value={{ setLanguageFiles, setLanguagePreference, ...state }}>
      {children}
    </TranslatorContext.Provider>
  );
};
