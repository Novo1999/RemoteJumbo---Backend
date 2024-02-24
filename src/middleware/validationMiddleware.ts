import { NextFunction, Request, Response } from 'express'
import { body, header, validationResult } from 'express-validator'
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from '../errors/customError'

const withValidationErrors = (validateValues: any) => {
  return [
    validateValues,
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg)

        if (errorMessages[0].startsWith('no job')) {
          throw new NotFoundError(errorMessages)
        }
        if (errorMessages[0].startsWith('not authorized')) {
          throw new UnauthorizedError('not authorized to access this route')
        }
        throw new BadRequestError(errorMessages)
      }
      next()
    },
  ]
}

export const validatePostJob = withValidationErrors([
  body('salary')
    .notEmpty()
    .withMessage('Salary cannot be empty')
    .custom(async (value) => {
      const minSalary = Number(value.split('-')[0])
      return minSalary > 90
    })
    .withMessage('initial salary cannot be less than 90K')
    .custom(async (value) => {
      const minSalary = Number(value.split('-')[0])
      const maxSalary = Number(value.split('-')[1])
      return maxSalary > minSalary
    })
    .withMessage('initial salary cannot be more than final salary'),
  body('createdBy').notEmpty().withMessage('Must have user id'),
])
