import Cors from 'cors'
import initMiddleware from './init-middleware'

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: 
  // https://github.com/expressjs/cors#configuration-options
  Cors({
    origin: "*",
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: ['86400000']
  })
)

export default cors;