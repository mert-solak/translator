import { CustomErrorType } from '@interfaces/main.interface';

export class CustomError extends Error {
  readonly message: string = 'Unknown error';

  constructor(type: CustomErrorType | string) {
    super();

    this.name = type;

    switch (type) {
      case 'FILES_NOT_FOUND':
        this.message = 'Language files not found';
        break;

      case 'WRONG_FILE_FORMAT':
        this.message = 'Language files not found';
        break;

      default:
    }
  }
}
