import { Router } from 'express'
import StatusError from './error'

const example: { id: string; name: string }[] = [{ id: 'foo', name: 'bar' }]

export const router = Router()

router.get('/example', (req, res) => {
  const { id } = req.query
  if (!id) return res.json({ results: example })
  if (Array.isArray(id))
    return res.json({
      results: example.filter(x =>
        (id as string[]).reduce((a, b) => a || x.id.includes(b), false)
      )
    })
  return res.json({
    results: example.filter(x => x.id.includes(id as string))
  })
})

router.use(() => {
  throw new StatusError('Endpoint Not Found', 404)
})

export default router
