import { JOB_SORTS } from './constants'

export const sortByValue = (sortBy: string) => {
  switch (sortBy) {
    case JOB_SORTS.salaryAscending:
      return { 'salary.min': 'asc' }
    case JOB_SORTS.salaryDescending:
      return { 'salary.min': 'desc' }
    case JOB_SORTS.mostApplied:
      return { applyCount: 'desc' }
    case JOB_SORTS.mostViewed:
      return { viewCount: 'desc' }
    case JOB_SORTS.newJobs:
      return { posted: -1 }
    case JOB_SORTS.featuredJobs:
      return { isFeatured: -1 }
    case JOB_SORTS.ads:
      return { isAd: -1 }
  }
}
