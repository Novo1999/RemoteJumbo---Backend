import { Router } from 'express'

const router = Router()

router
  .post('/new-job')
  .get('/most-starred')
  .delete('/:id')
  .patch('/edit/:id')
  .patch('/mark/:id')
