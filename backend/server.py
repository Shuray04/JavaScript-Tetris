import socket
from time import sleep

PORT = 27777

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

s.bind((socket.gethostname(), PORT))
s.listen(5)

conn, addr = s.accept()
print(f"Connection from {addr} has been established")

while True:
    sleep(5)
    conn.send(bytes("Hello World", "utf-8"))
    print("sent package")