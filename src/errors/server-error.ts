import { ErrorTypes } from "../types/error-types";

export class ServerError extends Error {
  errorType: ErrorTypes;
  innerError?: any;

  constructor(errorType: ErrorTypes, message?: string, innerError?: any) {
    super(message);
    this.errorType = errorType;
    this.innerError = innerError;
  }

  [Symbol.iterator](): Iterator<ServerError> {
    let current: ServerError | undefined = this;
    let done = false;
    const iterator = {
      next(): IteratorResult<ServerError> {
        if (done || !current) {
          return { value: undefined as any, done: true }; // 'undefined as any' to satisfy the type
        }
        const val = current;
        current = current.innerError as ServerError | undefined;
        if (!current) {
          done = true;
        }
        return { value: val, done: false };
      },
    };
    return iterator;
  }

  get why(): string {
    let _why = '';
    for (const e of this) {
      _why += `${_why.length ? ' <- ' : ''}${e.name}: ${e.message}`;
    }
    return _why;
  }
}