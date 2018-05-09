import requests
import cx_Oracle

# Always remember you are communicating through message. We are checking the Authentication based on message
class DatameerHandler(object):

    def __init__(self):
        self.dict_cred = {}


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
                "pwd" : pwd
            }

            message = "success"

        if message == "failure":
            return ("Check your Datameer Credentials")

        else:
            if self.check_db_credentials(uname, orcl_pwd) == "success":
                return "Login Successful"
            else:
                return "Check Your Oracle Password"


    def check_db_credentials(self, uname, orcl_pwd):
        message = '' # this step is important
        try:
            dsn = "bnxa2dbadm01.labcorp.com:1522/lcadwp1.labcorp.com"
            conn = cx_Oracle.connect(str(uname), str(orcl_pwd), dsn=dsn)
            message =  "success"
        except cx_Oracle.DatabaseError as e:
            message =  str(e)

        return message



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





# def oracle_login(uname, pwd, orcl_pwd):
