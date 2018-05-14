import requests

from .graph import loadTest
from .oracleDb_handler import Database_Handler

# Always remember you are communicating through message. We are checking the Authentication based on message
class DatameerHandler(object):

    def __init__(self):
        self.dict_cred = {}
        self.Db = Database_Handler()

    def datameer_login(self, uname, pwd, orcl_pwd):

        message = ""  # this step is important

        check_request = requests.get('https://datameer.labcorp.com:8443/rest/\
                                    user-management/logged-in-user?pretty',
                                    auth=(uname, pwd),
                                    verify=False)


        if check_request.status_code != 200:
            message = "failure"

        else:
            self.dict_cred = {
                "uname": uname,
                "pwd" : pwd,
                "orcl_pwd": orcl_pwd
            }
            message = "success"

        if message == "failure":
            return ("Check your Datameer Credentials")

        else:
            if self.Db.check_db_credentials(uname, orcl_pwd) == "success":
                return "Login Successful"
            else:
                return "Check Your Oracle Password"


    def getSheets(self, id):
        uname = self.dict_cred['uname']
        pwd = self.dict_cred['pwd']
        r = requests.get('https://datameer.labcorp.com:8443/rest/data/workbook/%d' % id, auth=(uname, pwd), verify=False)
        if r.status_code != 200:
           raise IOError('WorkBook ID '+ str(id) + ' does not exist!')
        js = r.json()
        path = js['path']
        names = [elem['name'] for elem in js['datas'][0]['sheets']]
        return names


    def get_data(self, id, sheetname):
        uname = self.dict_cred['uname']
        pwd = self.dict_cred['pwd']
        orcl_pwd = self.dict_cred['orcl_pwd']
        r = requests.get('https://datameer.labcorp.com:8443/rest/data/workbook/%d/%s/download' % (int(id), sheetname), auth=(uname, pwd), verify=False)
        if r.status_code != 200:
            raise IOError('Request failed')
        return loadTest(r.text, uname, orcl_pwd)





# asdfasdf
