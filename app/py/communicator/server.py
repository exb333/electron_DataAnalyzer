import sys
import zerorpc

from DataAnalyzer.app.py.backend.request_handler import datameer_login

class Python_Server(object):

    def echo(self, text):
        return text

    def login(self, uname, pwd):
        return datameer_login(uname, pwd)

def port_number():
    port = 4242
    return '{}'.format(port)

def main():
    address = "tcp://127.0.0.1:" + port_number()
    server = zerorpc.Server(Python_Server())
    server.bind(address)
    print("start running on {}".format(address))
    server.run()

if __name__ == '__main__':
    main()
