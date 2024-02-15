import { body } from 'express-validator'

export const postJobValidator = () => {
  return body('salary')
    .notEmpty()
    .withMessage('Salary cannot be empty')
    .custom((value) => {
      const minSalary = Number(value.split('-')[0])
      return minSalary < 90
    })
    .withMessage('initial salary cannot be less than 90K')
    .custom((value) => {
      const minSalary = Number(value.split('-')[0])
      const maxSalary = Number(value.split('-')[1])
      return maxSalary > minSalary
    })
    .withMessage('initial salary cannot be more than final salary')
}
