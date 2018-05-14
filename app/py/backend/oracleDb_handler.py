import cx_Oracle


class Database_Handler(object):

    def __init__(self):
        self.dsn = "bnxa2dbadm01.labcorp.com:1522/lcadwp1.labcorp.com"

    def check_db_credentials(self, uname, orcl_pwd):
        message = '' # this step is important
        try:
            conn = cx_Oracle.connect(str(uname), str(orcl_pwd), dsn=self.dsn)
            self.conn = conn
            message =  "success"
        except cx_Oracle.DatabaseError as e:
            message =  str(e)

        return message

    def test_name_fetcher(self, test_number, uname, orcl_pwd):
        con = cx_Oracle.connect(uname, orcl_pwd, dsn=self.dsn)
        cur = con.cursor()
        test_names = []

        for i in test_number:
        	cur.execute("select test_name from proddb2.trllr38_tst_master where test_number = '{0}' ".format(i))
        	result = cur.fetchone()
        	if result is not None:
        		# removing () and , from the data
        		test_names.append(''.join(result))
        	else:
        		test_names.append("None")

        cur.close()
        con.close()

        return test_names
