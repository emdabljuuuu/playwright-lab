export class ApiError extends Error {
  readonly status: number;
  readonly url: string;

  constructor(message: string, status: number, url: string) {
    const fullMessage = `${message}, url: ${url} - status: ${status}`
    super(fullMessage);
    this.status = status;
    this.url = url;
  }
}