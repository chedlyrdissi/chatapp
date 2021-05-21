enum MessageType {
	text
}

class ChatMessage {
	source: string;
	messageType: string;
	messageValue: string;
	status?: number;
	error?: string;
}

export {
	MessageType,
	ChatMessage
}; 
