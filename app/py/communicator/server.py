import sys
import zerorpc

from DataAnalyzer.app.py.backend.request_handler import DatameerHandler
from DataAnalyzer.app.py.backend.graph import TestAnalysis


class Python_Server(object):

    def echo(self, text):
        return text

    def login(self, uname, pwd, orcl_pwd):
        self.d = DatameerHandler()
        try:
            return self.d.datameer_login(uname, pwd, orcl_pwd)
        except Exception as e:
            return e

    def sheets(self, id):
        try:
            return self.d.getSheets(int(id))
        except Exception as e:
            return e

    def data(self, id, sheetname):
        try:
            return self.d.get_data(id, sheetname)
        except Exception as e:
            return e

    def scatter_graph(self, test_number):
        # return "hello"
        self.TA = TestAnalysis()
        try:
            return self.TA.generate_numeric_alpha(str(test_number))
        except Exception as e:
            return e

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
