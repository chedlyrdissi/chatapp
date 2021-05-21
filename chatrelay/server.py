#!/usr/bin/env python
import asyncio
import websockets
import json
from models import ChatMessage, MessageException, MessageTypeException, SourceException
from auth import register, unregister, getroom


rooms = []


async def broadcast(message, room):
	for user in room.users:
		await user.send(message)

async def hello(websocket, path):
	print(f"+ user logged in {path}.")
	register(websocket, path[1:], rooms)
	try:
		while True:
			try:
				msg = json.loads(await websocket.recv())
				msg = ChatMessage(**msg)
			except MessageException as err:
				await websocket.send(json.dumps({"status": 1, "error": f"{err}"}))
				continue
			except MessageTypeException as err:
				await websocket.send(json.dumps({"status": 2, "error": f"{err}"}))
				continue
			except SourceException as err:
				await websocket.send(json.dumps({"status": 3, "error": f"{err}"}))
				continue

			resp = ChatMessage(source=msg.source, messageType=msg.messageType, messageValue=msg.messageValue)
			resp.status = 0
			await broadcast(resp.to_json(), getroom(path[1:], rooms))
				
	except websockets.exceptions.ConnectionClosedOK:
		unregister(websocket, path[1:], rooms)
		print(f"x user logged out.")


print("Starting server.")
try:
	start_server = websockets.serve(hello, "localhost", 3000)
	asyncio.get_event_loop().run_until_complete(start_server)
	asyncio.get_event_loop().run_forever()
except:
	print("Killing server.")
