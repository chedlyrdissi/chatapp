#!/usr/bin/env python
import asyncio
import websockets
import json
from models import ChatMessage
from auth import register, unregister


users = set()


async def broadcast(message):
	message.broadcast = True
	for user in users:
		await user.send(message.to_json())

async def hello(websocket, path):
	print(f"+ user logged in {path}.")
	register(websocket, users)
	try:
		while True:
			msg = ChatMessage(**json.loads(await websocket.recv()))
			print(f"< {msg} ")

			resp = ChatMessage(source='server', messageType=msg.messageType, messageValue=msg.messageValue)
			if msg.broadcast:
				await broadcast(resp)
			else:
				await websocket.send(resp.to_json())
	
	except websockets.exceptions.ConnectionClosedOK:
		unregister(websocket, users)
		print(f"x user logged out.")


print("Starting server.")
start_server = websockets.serve(hello, "localhost", 3000)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
