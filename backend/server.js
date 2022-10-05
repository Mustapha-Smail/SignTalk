// import app 
import app from './app.js'
// import DB connection file 
import connectDB from './config/db.js'


connectDB()

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => console.log(`http://localhost:${PORT}/api`))

//export app for testing 
export default server 
