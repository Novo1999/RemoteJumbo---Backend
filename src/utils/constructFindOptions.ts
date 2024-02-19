import { FindParam } from '../interfaces'

export const constructFindOptions = (queries: FindParam) => {
  const { locations, positions, types, benefits, salary, q } = queries
  const locationSplit = locations.split(',')
  const regexQuery = { $regex: q.trim(), $options: 'i' }

  // to get locations and state as pair separated by comma
  let locationPair = []
  if (locations !== '') {
    for (let i = 0; i < locationSplit.length; i += 2) {
      const pair = `${locationSplit[i]},${locationSplit[i + 1]}`
      locationPair.push(pair.trim())
    }
  }
  // if user only searches
  if (!locations && !positions && !types && !benefits && q) {
    console.log(true)
    return {
      $or: [
        {
          title: regexQuery,
        },
        {
          companyName: regexQuery,
        },
      ],
    }
  }
  // if there are other options
  const arraysOfQuery = {
    locations: locationPair,
    positions: positions.split(','),
    types: types.toLowerCase().split(','),
    benefits: benefits.split(','),
  }

  return {
    $or: [
      { location: { $in: arraysOfQuery.locations || [] } },
      { position: { $in: arraysOfQuery.positions || [] } },
      { jobType: { $in: arraysOfQuery.types || [] } },
      { benefits: { $in: arraysOfQuery.benefits || [] } },
    ],
    $and: [
      { 'salary.min': { $lte: salary } },
      { title: { $regex: q.trim(), $options: 'i' } },
    ],
  }
}
