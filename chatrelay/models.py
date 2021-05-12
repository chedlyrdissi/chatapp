import json


class ChatMessage:

	def __init__(self, source=None, messageType=None, messageValue=None, broadcast=False):
		self.source = source
		self.messageType = messageType
		self.messageValue = messageValue
		self.broadcast = broadcast

	def __str__(self):
		commaneeded = {'c': True}
		return f"""
		{'{'}
		{injectoncondition(self.source is not None, "source", self.source, cm=True)}
		{injectoncondition(self.messageType is not None, "messageType", self.messageType, cm=True)}
		{injectoncondition(self.messageValue is not None, "messageValue", self.messageValue, cm=True)}
		{injectoncondition(self.broadcast, "broadcast", self.broadcast, isstring=False)}
		{'}'}"""

	def to_json(self):
		return json.dumps(self.__dict__)

def injectoncondition(condition, key, value, isstring=True, cm={'c': False}):
	if condition:
		return "\"{key}\": {isstr}{value}{isstr}{cm}".format(
			key=key, 
			value=value, 
			isstr="\"" if isstring else "",
			cm="," if cm else "")

	return ""


class ChatRoom:

	def __init__(self, roomid):
		self.id = roomid
		self.users = []

	def __eq__(self, other):
		if not isinstance(other, ChatRoom):
			return False
		return self.id == other.id
