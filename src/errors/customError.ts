import { StatusCodes } from 'http-status-codes'

export class BadRequestError extends Error {
  statusCode: number
  constructor(message: string[] | string) {
    super(message as string)
    this.statusCode = StatusCodes.BAD_REQUEST
  }
}
export class NotFoundError extends Error {
  statusCode: number
  constructor(message: string[] | string) {
    super(message as string)
    this.statusCode = StatusCodes.NOT_FOUND
  }
}
export class UnauthenticatedError extends Error {
  statusCode: number
  constructor(message: string[] | string) {
    super(message as string)
    this.statusCode = StatusCodes.UNAUTHORIZED
  }
}
export class UnauthorizedError extends Error {
  statusCode: number
  constructor(message: string[] | string) {
    super(message as string)
    this.statusCode = StatusCodes.FORBIDDEN
  }
}
