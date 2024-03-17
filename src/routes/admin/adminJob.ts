import { Router } from 'express'
import { getJobStats } from '../../controller/admin/getJobStats'

const router = Router()

router
  .post('/new-job')
  .get('/most-starred')
  .get('/job-stats/:adminId', getJobStats)
  .delete('/:id')
  .patch('/edit/:id')
  .patch('/mark/:id')

export default router
