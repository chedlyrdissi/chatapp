import json


class MessageException(Exception):
	pass

class MessageTypeException(Exception):
	pass

class SourceException(Exception):
	pass


class ChatMessage:

	def __init__(self, source: str, messageType, messageValue):
		if source is None or source == '':
			raise SourceException("Invalid source")
		if messageType is None or messageType == '':
			raise MessageTypeException("Invalid message type")
		if messageValue is None or messageValue == '':
			raise MessageException("empty message")

		self.source = source
		self.messageType = messageType
		self.messageValue = messageValue

	def __str__(self):
		return str(self.__dict__)

	def to_json(self):
		return json.dumps(self.__dict__)


class ChatRoom:

	def __init__(self, roomid):
		self.id = roomid
		self.users = []

	def __eq__(self, other):
		if not isinstance(other, ChatRoom):
			return False
		return self.id == other.id
