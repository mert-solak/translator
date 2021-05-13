import { difference } from 'lodash';
import { isDefined } from 'class-validator';

import { CustomError } from '../utils/error.util';
import { ErrorsEnum } from '../enums/errors.enum';
import { LanguageFiles } from '../interfaces/main.interface';

export const validateLanguageFiles = (languageFiles: LanguageFiles) => {
  if (!isDefined(languageFiles)) {
    throw new CustomError(ErrorsEnum.LANGUAGE_FILES_NOT_DEFINED);
  }

  if (typeof languageFiles !== 'object') {
    throw new CustomError(ErrorsEnum.WRONG_LANGUAGE_FILES_TYPE);
  }

  if (Object.keys(languageFiles).length < 1) {
    throw new CustomError(ErrorsEnum.MISSING_LANGUAGE_FILE);
  }

  const languages = Object.keys(languageFiles);

  languages.forEach((language: keyof LanguageFiles, index) => {
    if (index === languages.length - 1) {
      return;
    }

    compareObjects(languageFiles[language], languageFiles[languages[index + 1]]);
  });
};

export const compareObjects = (
  firstObject: Record<string, any> | string,
  secondObject: Record<string, any> | string,
) => {
  if (typeof firstObject !== typeof secondObject) {
    throw new CustomError(ErrorsEnum.LANGUAGE_FILES_DOES_NOT_MATCH, [firstObject, secondObject]);
  }

  if (typeof firstObject !== 'object') {
    return;
  }

  const firstObjectKeys = Object.keys(firstObject);
  const secondObjectKeys = Object.keys(secondObject);

  const keyDifferences = difference(firstObjectKeys, secondObjectKeys);

  if (keyDifferences.length > 0) {
    throw new CustomError(ErrorsEnum.LANGUAGE_FILES_DOES_NOT_MATCH, [
      firstObject,
      secondObject,
      keyDifferences,
    ]);
  }

  firstObjectKeys.forEach((eachKey) => {
    compareObjects(firstObject[eachKey], secondObject[eachKey]);
  });
};
