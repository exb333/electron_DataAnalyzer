import sys
import zerorpc


class Python_Server(object):

    def echo(self, text):
        return text

    def eliezer(self, text):
        return text

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
