import gzip
import json
import socket
import threading
import time


def handler(clientsocket, address):
    print('#########################################################################')
    print('Serverul asculta potentiali clienti.')
    # asteapta conectarea unui client la server
    # metoda `accept` este blocanta => clientsocket, care reprezinta socket-ul corespunzator clientului conectat

    print('S-a conectat un client.')
    # se proceseaza cererea si se citeste prima linie de text
    cerere = ''
    linieDeStart = ''
    while True:
        data = clientsocket.recv(1024)
        cerere = cerere + data.decode()
        print('S-a citit mesajul: \n---------------------------\n' + cerere + '\n---------------------------')
        if(cerere==""):
            time.sleep(1)
        pozitie = cerere.find('\r\n')
        if pozitie > -1:
            linieDeStart = cerere[0:pozitie]
            print('S-a citit linia de start din cerere: ##### ' + linieDeStart + '#####')
            break

        print('S-a terminat citirea.')

    response = None

    for element in linieDeStart.split("/"):

        if element.__contains__(" "):
            for e in element.split(" "):

                try:
                    if e.__contains__(".html") is True:
                        resursa = e
                        print("Resursa :" + resursa)
                        # if resursa.__contains__("?"):
                        #    resursa = "index.html"
                        with open("../continut/" + resursa, "rb") as f:
                            payload = f.read()

                        # Comprimăm payload-ul
                        payload_compressed = gzip.compress(payload)

                        response = ""
                        response += "HTTP/1/1 200 OK\r\n"
                        response += "Content-Length:" + str(len(payload_compressed)) + "\r\n"
                        response += "Content-Type: text/html\r\n"
                        response += "Content-Encoding: gzip\r\n"

                        response += "Server:localhost\r\n"
                        response += "\r\n"

                        response = response.encode("utf-8") + payload_compressed

                    elif e.__contains__(".css") is True:

                        resursa = e
                        print("Resursa :" + resursa)
                        with open("../continut/css/" + resursa, "rb") as f:
                            payload = f.read()

                        # Comprimăm payload-ul
                        payload_compressed = gzip.compress(payload)

                        response = ""
                        response += "HTTP/1/1 200 OK\r\n"
                        response += "Content-Length:" + str(len(payload_compressed)) + "\r\n"
                        response += "Content-Type: text/css\r\n"
                        response += "Content-Encoding: gzip\r\n"

                        response += "Server:localhost\r\n"
                        response += "\r\n"

                        response = response.encode("utf-8") + payload_compressed
                    elif e.__contains__(".ico") is True:
                        resursa = e
                        print("Resursa :" + resursa)
                        with open("../continut/" + resursa, "rb") as f:
                            payload = f.read()

                        # Comprimăm payload-ul
                        payload_compressed = gzip.compress(payload)

                        response = ""
                        response += "HTTP/1/1 200 OK\r\n"
                        response += "Content-Length:" + str(len(payload_compressed)) + "\r\n"
                        response += "Content-Type: image/x-icon\r\n"
                        response += "Content-Encoding: gzip\r\n"

                        response += "Server:localhost\r\n"
                        response += "\r\n"
                        response = response.encode("utf-8") + payload_compressed

                    elif e.__contains__(".json") is True:
                        resursa = e
                        print("Resursa :" + resursa)
                        with open("../continut/resurse/" + resursa, "rb") as f:
                            payload = f.read()

                        # Comprimăm payload-ul
                        payload_compressed = gzip.compress(payload)

                        response = ""
                        response += "HTTP/1/1 200 OK\r\n"
                        response += "Content-Length:" + str(len(payload_compressed)) + "\r\n"
                        response += "Content-Type: application/json\r\n"
                        response += "Content-Encoding: gzip\r\n"

                        response += "Server:localhost\r\n"
                        response += "\r\n"
                        response = response.encode("utf-8") + payload_compressed

                    elif e.__contains__(".js") is True:
                        resursa = e
                        print("Resursa :" + resursa)
                        with open("../continut/js/" + resursa, "rb") as f:
                            payload = f.read()

                        # Comprimăm payload-ul
                        payload_compressed = gzip.compress(payload)

                        response = ""
                        response += "HTTP/1/1 200 OK\r\n"
                        response += "Content-Length:" + str(len(payload_compressed)) + "\r\n"
                        response += "Content-Type: application/js\r\n"
                        response += "Content-Encoding: gzip\r\n"

                        response += "Server:localhost\r\n"
                        response += "\r\n"
                        response = response.encode("utf-8") + payload_compressed
                    elif e.__contains__(".png") is True:
                        resursa = e
                        print("Resursa :" + resursa)
                        with open("../continut/img/" + resursa, "rb") as f:
                            payload = f.read()

                        # Comprimăm payload-ul
                        payload_compressed = gzip.compress(payload)

                        response = ""
                        response += "HTTP/1/1 200 OK\r\n"
                        response += "Content-Length:" + str(len(payload_compressed)) + "\r\n"
                        response += "Content-Type: text/png\r\n"
                        response += "Content-Encoding: gzip\r\n"
                        response += "Server:localhost\r\n"
                        response += "\r\n"
                        response = response.encode("utf-8") + payload_compressed
                    elif e.__contains__(".jpeg") is True:
                        resursa = e
                        print("Resursa :" + resursa)
                        with open("../continut/img/" + resursa, "rb") as f:
                            payload = f.read()

                        # Comprimăm payload-ul
                        payload_compressed = gzip.compress(payload)

                        response = ""
                        response += "HTTP/1/1 200 OK\r\n"
                        response += "Content-Length:" + str(len(payload_compressed)) + "\r\n"
                        response += "Content-Type: text/jpeg\r\n"
                        response += "Content-Encoding: gzip\r\n"

                        response += "Server:localhost\r\n"
                        response += "\r\n"
                        response = response.encode("utf-8") + payload_compressed
                    elif e.__contains__(".gif") is True:
                        resursa = e
                        print("Resursa :" + resursa)
                        with open("../continut/img/" + resursa, "rb") as f:
                            payload = f.read()

                        # Comprimăm payload-ul
                        payload_compressed = gzip.compress(payload)

                        response = ""
                        response += "HTTP/1/1 200 OK\r\n"
                        response += "Content-Length:" + str(len(payload_compressed)) + "\r\n"
                        response += "Content-Type: text/gif\r\n"
                        response += "Content-Encoding: gzip\r\n"

                        response += "Server:localhost\r\n"
                        response += "\r\n"
                        response = response.encode("utf-8") + payload_compressed

                    elif e.__contains__(".xml") is True:
                        resursa = e
                        print("Resursa :" + resursa)
                        with open("../continut/resurse/" + resursa, "rb") as f:
                            payload = f.read()

                        # Comprimăm payload-ul
                        payload_compressed = gzip.compress(payload)

                        response = ""
                        response += "HTTP/1/1 200 OK\r\n"
                        response += "Content-Length:" + str(len(payload_compressed)) + "\r\n"
                        response += "Content-Type: application/xml\r\n"
                        response += "Content-Encoding: gzip\r\n"

                        response += "Server:localhost\r\n"
                        response += "\r\n"
                        response = response.encode("utf-8") + payload_compressed




                except:
                    payload = "<b>Item Not Found</b>".encode("utf-8")
                    payload_compressed = gzip.compress(payload)

                    response = ""
                    response += "HTTP/1/1 404 NOT FOUND\r\n"
                    response += "Content-Length:" + str(len(payload_compressed)) + "\r\n"
                    response += "Content-Type: text/html\r\n"
                    response += "Content-Encoding: gzip\r\n"

                    response += "Server:localhost\r\n"
                    response += "\r\n"
                    response = response.encode("utf-8") + payload_compressed

    # resursa = "Hello World " + resursa

    if linieDeStart.split(" ")[1] == '/api/utilizatori':
        with open("../continut/resurse/utilizatori.json", "r") as f:
            data = json.load(f)
        new_data = json.loads(cerere.split("\r\n\r\n")[1])
        data.append(new_data)
        with open("../continut/resurse/utilizatori.json", 'w') as f:
            json.dump(data, f)

        payload_compressed = gzip.compress("OK".encode("utf-8"))
        response = ""
        response += "HTTP/1.1 200 OK\r\n"
        response += "Content-Length: 2\r\n"
        response += "Content-Type: text/plain\r\n"
        response += "Content-Encoding: gzip\r\n"
        response += "Server: localhost\r\n"
        response += "\r\n"
        response = response.encode("utf-8") + payload_compressed

    if response is not None:
        clientsocket.sendall(response)

    clientsocket.close()
    print('S-a terminat comunicarea cu clientul.' + str(threading.currentThread().name))


if __name__ == "__main__":
    # creeaza un server socket
    serversocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    # specifica ca serverul va rula pe portul 5678, accesibil de pe orice ip al serverului
    serversocket.bind(('', 5678))
    # serverul poate accepta conexiuni; specifica cati clienti pot astepta la coada
    serversocket.listen()
    id = 0
    while True:
        (clientsocket, address) = serversocket.accept()
        id += 1
        threading.Thread(target=handler, args=(clientsocket, address), name="Thread " + str(id)).start()
