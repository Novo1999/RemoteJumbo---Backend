import { Router } from 'express'
import { getJobs } from '../../controller/user/getJobs'
import { getSingleJob } from '../../controller/user/getSingleJob'
import { filterJobs } from '../../controller/user/filter'
import { sortJobs } from '../../controller/user/sort'
import { getRandomJobs } from '../../controller/user/getRandomJobs'

const router = Router()

router
  .get('/all', getJobs)
  .get('/filter', filterJobs)
  .get('/star')
  .get('/sort/:sortBy', sortJobs)
  .get('/random/:id', getRandomJobs)
  .get('/:id', getSingleJob)

export default router
