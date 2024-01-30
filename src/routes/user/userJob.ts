import { Router } from 'express'
import { getDocCounts } from '../../controller/getDocCounts'
import { addViewCount } from '../../controller/user/addViewCount'
import { filterJobs } from '../../controller/user/filter'
import { getJobs } from '../../controller/user/getJobs'
import { getRandomJobs } from '../../controller/user/getRandomJobs'
import { getSingleJob } from '../../controller/user/getSingleJob'

const router = Router()

router
  .get('/all', getJobs)
  .get('/filter', filterJobs)
  .get('/star')
  .get('/total-jobs', getDocCounts)
  .get('/random/:id', getRandomJobs)
  .get('/:id', getSingleJob)
  .patch('/:id', addViewCount)

export default router
