import express from 'express'
import logger from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import { LIMIT_JSON } from './lib/constants'
import contactsRouter from './routes/api/contacts'
import authRouter from './routes/api/auth'
import usersRouter from './routes/api/users'

export const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(helmet())
app.use(logger(formatsLogger))
app.use(express.static(process.env.FOLDER_FOR_AVATARS))
app.use(cors())
app.use(express.json({limit: LIMIT_JSON}))

app.use('/api/auth', authRouter)

app.use('/api/users', usersRouter)

app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

