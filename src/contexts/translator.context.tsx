import React, { createContext, useCallback, useEffect, useMemo, useReducer } from 'react';

import { Props, State, Action, TranslatorContextValue } from '../interfaces/main.interface';
import { validateLanguageFiles } from '../helpers/validation.helper';

const initialState: State = {
  languageFiles: undefined,
  languagePreference: undefined,
  options: {
    validateLanguageFiles: true,
  },
};

const translatorContextValue: TranslatorContextValue = {
  ...initialState,
  setLanguageFiles: () => {},
  setLanguagePreference: () => {},
  setOptions: () => {},
};

export const TranslatorContext = createContext(translatorContextValue);

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_LANGUAGE_FILES':
      return { ...state, languageFiles: { ...action.payload } };
    case 'SET_LANGUAGE_PREFERENCE':
      return { ...state, languagePreference: action.payload };
    case 'SET_OPTIONS':
      return { ...state, options: { ...action.payload } };

    default:
      return state;
  }
};

export const TranslatorProvider: React.FC<Props> = ({
  children,
  languageFiles,
  languagePreference,
  options,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    languageFiles,
    languagePreference,
    options,
  });

  const setLanguageFiles = useCallback(
    (newLanguageFiles: State['languageFiles']) =>
      dispatch({ type: 'SET_LANGUAGE_FILES', payload: newLanguageFiles }),
    [],
  );
  const setLanguagePreference = useCallback(
    (newLanguagePreference: State['languagePreference']) =>
      dispatch({ type: 'SET_LANGUAGE_PREFERENCE', payload: newLanguagePreference }),
    [],
  );
  const setOptions = useCallback(
    (newOptions: State['options']) => dispatch({ type: 'SET_OPTIONS', payload: newOptions }),
    [],
  );

  const { validateLanguageFiles: validateLanguageFilesOption } = state.options;

  useEffect(() => {
    setLanguagePreference(languagePreference);
  }, [languagePreference]);

  useEffect(() => {
    if (validateLanguageFilesOption) {
      validateLanguageFiles(languageFiles);
    }
    setLanguageFiles(languageFiles);
  }, [languageFiles, validateLanguageFilesOption]);

  const Provider = useMemo(
    () => (
      <TranslatorContext.Provider value={{ setLanguageFiles, setLanguagePreference, setOptions, ...state }}>
        {children}
      </TranslatorContext.Provider>
    ),
    [state],
  );

  return <>{Provider}</>;
};
