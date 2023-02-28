const express = require("express")
const app = express()
const cors = require('cors')
const socket = require('socket.io')
app.use(cors())

const port = 8000

const server = app.listen(port, () => {
    console.log(`Server is running on PORT: ${port}`)
})

const io = socket(server, {
    cors: {
        origin: ['http://localhost:3000'],
        methods: ['GET', 'POST'],
        allowedHeaders: ['*'],
        credentials: true,
    }
});

io.on("connection", socket =>{
    socket.on("message_from_client", data => {
        socket.broadcast.emit("message_from_server", data)
    })
})