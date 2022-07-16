import { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

const Chat = ({ socket, username, room }) => {
	const [message, setMessage] = useState('');
	const [messageList, setMessageList] = useState([]);
	const sendMessage = async () => {
		if (message !== '') {
			const messageData = {
				room,
				author: username,
				message,
				time:
					new Date(Date.now()).getHours() +
					':' +
					new Date(Date.now()).getMinutes(),
			};

			await socket.emit('send_message', messageData);
			setMessageList((list) => [...list, messageData]);
			setMessage('');
		}
	};

	useEffect(() => {
		socket.on('receive_message', (data) => {
			setMessageList((list) => [...list, data]);
		});
	}, [socket]);

	return (
		<div className='chat-window'>
			<div className='chat-header'>
				<p>Live Chat</p>
			</div>
			<div className='chat-body'>
				<ScrollToBottom className='message-container'>
					{messageList.map((message, index) => (
						<div
							className='message'
							key={index}
							id={username === message.author ? 'you' : 'other'}
						>
							<div>
								<div className='message-content'>
									<p>{message.message}</p>
								</div>
								<div className='message-meta'>
									<p id='time'>{message.time}</p>
									<p id='author'>{message.author}</p>
								</div>
							</div>
						</div>
					))}
				</ScrollToBottom>
			</div>
			<div className='chat-footer'>
				<input
					value={message}
					type='text'
					placeholder='Message...'
					onChange={(e) => setMessage(e.target.value)}
					onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
				/>
				<button onClick={sendMessage}>&#9658;</button>
			</div>
		</div>
	);
};
export default Chat;
