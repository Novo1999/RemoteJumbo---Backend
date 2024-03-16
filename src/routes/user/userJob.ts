import { Router } from 'express'
import { getDocCounts } from '../../controller/getDocCounts'
import { addViewCount } from '../../controller/user/addViewCount'
import { applyJob } from '../../controller/user/applyJob'
import { deleteJob } from '../../controller/user/deleteJob'
import { editJob } from '../../controller/user/editJob'
import { getJobs } from '../../controller/user/getJobs'
import { getMaxSalary } from '../../controller/user/getMaxSalary'
import { getRandomJobs } from '../../controller/user/getRandomJobs'
import { getSingleJob } from '../../controller/user/getSingleJob'
import { getUserStarredJobs } from '../../controller/user/getUserStarredJobs'
import { postJob } from '../../controller/user/postJob'
import { searchJob } from '../../controller/user/searchJob'
import { starJob } from '../../controller/user/star'
import { validatePostJob } from '../../middleware/validationMiddleware'

const router = Router()

router
  .get('/all', getJobs)
  .get('/star')
  .get('/total-jobs', getDocCounts)
  .get('/search', searchJob)
  .get('/max-salary', getMaxSalary)
  .post('/post-job', validatePostJob, postJob)
  .patch('/edit-job/:id', validatePostJob, editJob)
  .get('/random/:id', getRandomJobs)
  .get('/starred/:uid', getUserStarredJobs)
  .post('/star/:id', starJob)
  .get('/:id', getSingleJob)
  .patch('/:id', addViewCount)
  .delete('/delete/:id', deleteJob)
  .post('/apply/:id', applyJob)

export default router
