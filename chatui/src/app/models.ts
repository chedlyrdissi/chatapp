enum MessageType {
	text
}

class ChatMessage {
	source?: string;
	messageType?: string;
	messageValue: string;
	broadcast?: boolean;
}

export {
	MessageType,
	ChatMessage
}; 
