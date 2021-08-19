import socket
from time import sleep

HOST = '18.192.119.166' 
PORT = 27777

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect((HOST, PORT))

while True:
    msg = s.recv(1024)
    print(msg.decode("utf-8"))