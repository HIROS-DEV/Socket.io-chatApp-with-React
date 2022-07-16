import { useState } from 'react';
import io from 'socket.io-client';
import './App.css';
import Chat from './Chat';

const socket = io.connect('http://localhost:5000');

function App() {
	const [username, setUserName] = useState('');
	const [room, setRoom] = useState('');
	const [showChat, setShowChat] = useState(false);

	const joinRoom = () => {
		if (username !== '' && room !== '') {
			socket.emit('join_room', room);
			setShowChat(true);
		}
	};

	return (
		<div className='App'>
			{!showChat ? (
				<div className='joinChatContainer'>
					<h3>Join A Chat</h3>
					<input
						value={username}
						type='text'
						placeholder='Username...'
						onChange={(e) => setUserName(e.target.value)}
					/>
					<input
						value={room}
						type='text'
						placeholder='Room ID...'
						onChange={(e) => setRoom(e.target.value)}
					/>
					<button onClick={joinRoom}>Join A Room</button>
				</div>
			) : (
				<Chat socket={socket} username={username} room={room} />
			)}
		</div>
	);
}

export default App;
