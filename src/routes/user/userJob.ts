import { Router } from 'express'
import { getJobs } from '../../controller/user/getJobs'
import { getSingleJob } from '../../controller/user/getSingleJob'

const router = Router()

router
  .get('/all', getJobs)
  .get('/:id', getSingleJob)
  .patch('/filter')
  .get('/star')
  .get('/sort')

export default router
