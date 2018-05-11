import pandas as pd


def loadTest(txt):
		# load data
        df = pd.read_csv(StringIO(txt), header=0, dtype={'test_number':str,'result':str,'Count':np.int64})
        test_numbers = df.test_number.unique().tolist()

        # keep data for efficiency
        # self.data = df
        # self.range_data = None

        # test_names = OracleDb.testName_fetcher(test_number = test_numbers)

        return test_numbers



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
