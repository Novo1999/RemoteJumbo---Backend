import { Router } from 'express'

const router = Router()

router.get('/all').get('/:id').patch('/filter').get('/star').get('/sort')
