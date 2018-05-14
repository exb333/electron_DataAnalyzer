import numpy as np
import pandas as pd
from io import StringIO

from .oracleDb_handler import Database_Handler


def loadTest(test_str, uname, orcl_pwd):
		# load data
        tests = {}
        df = pd.read_csv(StringIO(test_str), header=0, dtype={'test_number':str,'result':str,'Count':np.int64})
        test_numbers = df.test_number.unique().tolist()

        # keep data for efficiency
        # self.data = df
        # self.range_data = None
        db = Database_Handler()
        test_names = db.test_name_fetcher(test_numbers, uname, orcl_pwd)

        for i in range(len(test_numbers)):
            tests[test_numbers[i]] = str(test_names[i]).strip()

        return tests

		# self.nameListWidget.clear()
		# for i in lst:
		# 	self.nameListWidget.addItem(str(i))
        #
		# for i in test_numbers:
		# 	self.testListWidget.addItem(str(i))

# def testName_fetcher(test_number=None):
#     dsn = "bnxa2dbadm01.labcorp.com:1522/lcadwp1.labcorp.com"
# 	con = cx_Oracle.connect(user=user, password= passwrd, dsn=dsn)
# 	cur = con.cursor()
# 	lst = []
#
# 	for i in test_number:
# 		cur.execute("select test_name from proddb2.trllr38_tst_master where test_number = '{0}' ".format(i))
# 		result = cur.fetchone()
# 		if result is not None:
# 			# removing () and , from the data
# 			lst.append(''.join(result))
# 		else:
# 			lst.append("None")
#
# 	cur.close()
# 	con.close()

	# return lst
