#!/usr/bin/env python
import asyncio
import websockets
import json


users = set()

def register(user):
	users.add(user)

def unregister(user):
	users.remove(user)

async def broadcast(message):
	for user in users:
		await user.send(message)

async def hello(websocket, path):
	print(f"+ user logged in {path}.")
	register(websocket)
	try:
		while True:
			msg = json.loads(await websocket.recv())
			print(f"< {msg} ")

			if 'broadcast' in msg and msg['broadcast']:
				await broadcast(json.dumps({'type': 'text', 'message': f"broadcasted {msg['message']}"}))

			await websocket.send(json.dumps({'type': 'text', 'message': f"received {msg['message']}"}))
	
	except websockets.exceptions.ConnectionClosedOK:
		unregister(websocket)
		print(f"x user logged out.")

start_server = websockets.serve(hello, "localhost", 3000)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
