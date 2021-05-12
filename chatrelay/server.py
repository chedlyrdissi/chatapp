#!/usr/bin/env python
import asyncio
import websockets
import json
from models import ChatMessage
from auth import register, unregister, getroom


rooms = []


async def broadcast(message, room):
	message.broadcast = True
	for user in room.users:
		await user.send(message.to_json())

async def hello(websocket, path):
	print(f"+ user logged in {path}.")
	register(websocket, path[1:], rooms)
	try:
		while True:
			msg = ChatMessage(**json.loads(await websocket.recv()))
			# print(f"< {msg} ")

			resp = ChatMessage(source='server', messageType=msg.messageType, messageValue=msg.messageValue)
			if msg.broadcast:
				await broadcast(resp, getroom(path[1:], rooms))
			else:
				await websocket.send(resp.to_json())
	
	except websockets.exceptions.ConnectionClosedOK:
		unregister(websocket, path[1:], rooms)
		print(f"x user logged out.")


print("Starting server.")
start_server = websockets.serve(hello, "localhost", 3000)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
