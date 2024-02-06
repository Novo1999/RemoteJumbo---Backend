import { CronJob } from 'cron'

const job = new CronJob(
  '* * * * * *',
  function () {
    console.log('MESSAGE')
  },
  null,
  true,
  'America/Los_Angeles'
)

job.start()
