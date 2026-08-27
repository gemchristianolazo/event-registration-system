import express from 'express'

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())

app.get('/', (req, res) => {
  res.send('tup-manila-campus-event-registration-system API is running.')
})

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.listen(PORT, () => {
  console.log(`tup-manila-campus-event-registration-system server listening on http://localhost:${PORT}`)
})
