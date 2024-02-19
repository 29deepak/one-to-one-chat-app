const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const sequelize = require('./utils/database')
const socket = require('socket.io')
const app = express()
app.use(bodyParser.json())
app.use(express.json())
app.use(cors())

// routes
const userRoutes = require('./router/user')
const messagRoutes = require('./router/message')

//modals

const User = require('./modals/user');
const Message = require('./modals/message')

//use
app.use('/api', userRoutes)
app.use('/api', messagRoutes)

//join
User.hasMany(Message);
Message.belongsTo(User);

const server = http.createServer(app).listen(4000)





sequelize
    .sync()
    .then(() => {

        // server.listen(4000, () => {
        //     console.log("server is connected succesfully")
        // })
        server
        console.log("connected")


    })
    .catch((err) => {
        console.log(err)
    })



const onlineUsers = new Map();
let getOnlineUsers = []
const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    }
})

io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle new user joining
    socket.on('add-user', (userId) => {
        console.log("cnbcn n", userId)
        !getOnlineUsers.some(user => user.userId == userId) &&
            getOnlineUsers.push({ userId: userId, socket: socket.id })
        onlineUsers.set(userId, socket.id);
        //   io.emit('user-list', Array.from(onlineUsers.keys())); // Send updated user list to all clients
        console.log(getOnlineUsers)
        io.emit("online-users-list", getOnlineUsers)
    });


    // Handle incoming messages
    socket.on('send-msg', (data) => {
        console.log(data)
        const sendUserSocket = onlineUsers.get(data.to);
        console.log(sendUserSocket)
        if (sendUserSocket) {
            io.to(sendUserSocket).emit('msg-received', data.message);
        }
    });
    socket.on("disconnect", () => {
        console.log("-------------123------------------")
        //some mistake to fix it in react js
        getOnlineUsers = getOnlineUsers.filter(user => user.socketId !== socket.id);
        io.emit("online-users-list", getOnlineUsers)

    })

    // Handle user disconnect
    // socket.on('disconnect', () => {
    //   console.log('A user disconnected');
    //   // Remove user from the online users list
    //   for (const [key, value] of onlineUsers.entries()) {
    //     if (value === socket.id) {
    //       onlineUsers.delete(key);
    //       io.emit('user-list', Array.from(onlineUsers.keys())); // Send updated user list to all clients
    //       break;
    //     }
    //   }
    // });
});
// global.onlineUsers = new Map();

// io.on("connection", (socket) => {
//     global.chatSocket = socket;

//     socket.on("add-user", (userId) => {
//         console.log(userId, socket.id)
//         global.onlineUsers.set(userId, socket.id)
//     })
//     socket.on("send-msg", (data) => {
//         console.log("frfvnfv ", data)
//         console.log(global.onlineUsers)
//         const sendUserSocket = onlineUsers.get(data.to);
//         console.log(sendUserSocket)
//         socket.emit("msg-received", data.message)
//         // console.log(sendUserSocket, "fgbnvmc")
//         // if (sendUserSocket) {
//         //     socket.to(sendUserSocket).emit("msg-received", data.message)
//         // }
//     })
// })

