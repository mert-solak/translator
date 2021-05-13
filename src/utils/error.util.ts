import { ErrorsEnum } from '../enums/errors.enum';

export class CustomError extends Error {
  readonly message: string = 'Unknown error';

  constructor(type: number, extra?: any) {
    super();

    this.name = ErrorsEnum[type];

    let extraMessage = extra;

    if (typeof extra === 'object') {
      extraMessage = JSON.stringify(extraMessage);
    } else if (Array.isArray(extra)) {
      extraMessage = JSON.stringify(extraMessage);
    }

    switch (type) {
      case ErrorsEnum.LANGUAGE_FILES_NOT_DEFINED:
        this.message = 'languageFiles is not defined';
        break;

      case ErrorsEnum.LANGUAGE_FILES_DOES_NOT_MATCH:
        this.message = `Language files have different keys: ${extraMessage}`;
        break;

      case ErrorsEnum.MISSING_LANGUAGE_FILE:
        this.message = 'Language file could not found';
        break;

      case ErrorsEnum.WRONG_LANGUAGE_FILES_TYPE:
        this.message = 'languageFiles is not an object';
        break;

      default:
    }
  }
}
