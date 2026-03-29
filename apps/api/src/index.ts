import express from 'express'
import cors from 'cors'

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'Clinora API' })
})

app.listen(port, () => {
    console.log(`🚀 API server running on http://localhost:${port}`)
})
