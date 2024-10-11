import express from "express"
import colors from 'colors'
import cors, { CorsOptions } from 'cors'
import morgan from "morgan"
import swaggerUI, { serve } from 'swagger-ui-express'
import swaggerSpec, { swaggerUIOptions } from "./config/swagger"
import router from './router'
import db from "./config/db"

//Connect database
export async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        //console.log(colors.bgGreen.white('DB successfully connected'))
    } catch (error) {
        console.log(colors.bgRed.white('Error connecting DB'))
    }
}
connectDB()

//Instancia de express
const server = express()

//Permitir conexiones
const corsOptions: CorsOptions = {
    origin: function(origin, callback) {
        if(origin === process.env.FRONTEND_URL) {
            callback(null, true)
        } else {
            callback(new Error('CORS error'))
        }
    }
}

server.use(cors(corsOptions))

//Leer datos de formulario
server.use(express.json())
server.use(morgan('dev'))

//Routing
server.use('/api/products', router)

//Docs
server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec, swaggerUIOptions))


export default server