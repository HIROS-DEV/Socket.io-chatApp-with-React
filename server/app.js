require('colors');

const app = require('express')();
const PORT = process.env.PORT || 5000;

const cors = require('cors');
app.use(cors());

const { Server } = require('socket.io');
const server = require('http').createServer(app);
const io = new Server(server, {
	cors: {
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST'],
	},
});

io.on('connection', (socket) => {
	console.log(`User connected: ${socket.id}`);
	socket.on('join_room', (data) => {
		socket.join(data);
		console.log(`User with ID : ${socket.id} joined room: ${data}`);
	});
	socket.on("send_message", (data) => {
		socket.to(data.room).emit("receive_message", data);
	})
	socket.on('disconnect', () => {
		console.log('User disconnected', socket.id);
	});
});

server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`.blue);
});
