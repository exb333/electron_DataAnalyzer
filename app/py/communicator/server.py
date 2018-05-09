import sys
import zerorpc

from DataAnalyzer.app.py.backend.request_handler import DatameerHandler


class Python_Server(object):

    def echo(self, text):
        return text

    def login(self, uname, pwd, orcl_pwd):

        self.d = DatameerHandler()
        return self.d.datameer_login(uname, pwd, orcl_pwd)


    def ray(self, id):

        # lst = [i for i in range(100)]
        # return lst
        return self.d.getSheets(int(id))

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
