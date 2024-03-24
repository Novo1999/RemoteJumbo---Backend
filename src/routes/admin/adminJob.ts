import { Router } from 'express'
import { deleteJob } from '../../controller/admin/deleteJob'
import { getJobStats } from '../../controller/admin/getJobStats'

const router = Router()

router
  .post('/new-job')
  .get('/most-starred')
  .get('/job-stats/:adminId', getJobStats)
  .delete('/delete-as-admin/:adminId/:id', deleteJob)
  .patch('/edit/:id')
  .patch('/mark/:id')

export default router
