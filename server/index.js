import express from "express";
import cors from 'cors'
import { PORT } from './config.js'
import employesRoutes from './routes/employes.routes.js';

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api', employesRoutes)

app.listen(PORT, () => {
  console.log('Server running in port ' + PORT)
})
