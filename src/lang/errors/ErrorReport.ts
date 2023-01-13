export class ErrorReport extends Error {
  constructor(public message: string) {
    super(message)
  }
}
