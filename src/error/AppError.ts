export enum HttpCode {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

interface AppErrorArgs {
  name?: string;
  status: HttpCode;
  funcName: string;
  message: string;
  isPlanned?: boolean;
}

export class AppError extends Error {
  public readonly name: string;
  public readonly httpCode: HttpCode;
  public readonly isPlanned: boolean = true;

  constructor(args: AppErrorArgs) {
    super(args.message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = args.name || 'Error';
    this.httpCode = args.status;

    // Remember to set isPlanned to false when throwing a critical error.
    if (args.isPlanned !== undefined) {
      this.isPlanned = args.isPlanned;
    }

    Error.captureStackTrace(this);
  }
}
