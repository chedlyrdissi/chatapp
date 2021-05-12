from models import ChatRoom


def getroom(roomid, rooms):
	return next(filter(lambda r: r.id == roomid, rooms), None)

def register(user, roomid, rooms):
	room = getroom(roomid, rooms) or ChatRoom(roomid)
	room.users.append(user)
	if room not in rooms:
		rooms.append(room)

def unregister(user, roomid, rooms):
	room = getroom(roomid, rooms)
	room.users.remove(user)
	if len(room.users) == 0:
		rooms.remove(room)
