import { isDefined } from 'class-validator';
import { useContext, useEffect, useState } from 'react';

import { CustomError } from '@utils/error.util';
import { ErrorsEnum } from '@enums/errors.enum';
import { LanguageFiles, TranslatorContextValue } from '@interfaces/main.interface';
import { TranslatorContext } from '@contexts/translator.context';

const useTranslator = <L extends LanguageFiles>(section: keyof L[keyof L]): L[keyof L][keyof L[keyof L]] => {
  const { languageFiles, languagePreference } = useContext(TranslatorContext) as Omit<
    TranslatorContextValue,
    'languageFiles' | 'languagePreference'
  > & {
    languageFiles: L;
    languagePreference: keyof L;
  };

  if (!isDefined(languageFiles)) {
    throw new CustomError(ErrorsEnum[ErrorsEnum.FILES_NOT_FOUND]);
  }

  if (Object.keys(languageFiles).length < 1) {
    throw new CustomError(ErrorsEnum[ErrorsEnum.WRONG_FILE_FORMAT]);
  }

  let initialPreference;

  if (isDefined(languagePreference)) {
    initialPreference = languagePreference;
  } else {
    [initialPreference] = Object.keys(languageFiles);
  }

  const [translated, setTranslated] = useState<L[keyof L][keyof L[keyof L]]>(
    languageFiles[initialPreference][section],
  );

  useEffect(() => {
    if (isDefined(languagePreference) && Object.keys(languageFiles).includes(languagePreference as string)) {
      setTranslated(languageFiles[languagePreference][section]);
    }
  }, [languagePreference, languageFiles]);

  return translated;
};

export { useTranslator };
