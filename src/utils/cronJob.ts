import { CronJob } from 'cron'
import { shuffleAds } from '../controller/shuffleAds'

const job = new CronJob(
  '0 0 11 * * *',
  function () {
    shuffleAds()
  },
  null,
  true,
  'Asia/Dhaka'
)

job.start()
