import numpy as np
import pandas as pd
from io import StringIO

from .oracleDb_handler import Database_Handler
from .Scatter_Graph import scatter_plot


class TestAnalysis:

    def loadTest(self, test_str, uname, orcl_pwd):
        global test_file_url #using global variable
        test_file_url = test_str
		# empty dict
        tests = {}
        # loading data
        # StringIO is used here because it is using test_str as a file, which in real is not (it's just a string)
        df = pd.read_csv(StringIO(test_str), header=0, dtype={'test_number':str,'result':str,'Count':np.int64})
        test_numbers = df.test_number.unique().tolist()

        db = Database_Handler()
        test_names = db.test_name_fetcher(test_numbers, uname, orcl_pwd)

        for i in range(len(test_numbers)):
            tests[test_numbers[i]] = str(test_names[i]).strip()

        return tests #returning dictionary to our view

    def generate_numeric_alpha(self, tx):

        #loading file
        df = pd.read_csv(StringIO(test_file_url), header=0, dtype={'test_number':str,'result':str,'Count':np.int64})

        # Coerce alpha result to NaN
        df1 = pd.DataFrame(pd.to_numeric(df['result'], errors='coerce'))

        # Get numeric list
        t = df.ix[df1.dropna().index.values]
        t['result'] = t.result.astype('float')

        # Get alpha list
        index = df1['result'].index[df1['result'].apply(np.isnan)]
        z = df.ix[index]

        # Selecting data according to test number
        q = t[t['test_number'] == tx].groupby('result')['Count'].sum()
        numeric_values = q.to_frame().reset_index()
        alpha_values = z[z['test_number'] == tx].sort_values(by=['Count'],ascending=False)

        return scatter_plot(numeric_values)
		# # Draw scatter plot
		# self.plot_scat.print_g1(fnum=numeric_values)
        #
		# # Keep for subsetting
		# self.range_data = numeric_values
        #
		# # Fetching description of alpha values from database
		# desc = OracleDb.description_fetcher(abbrv_list=alpha_values['result'])
        #
		# # Below line will remove the false positive warning
		# pd.options.mode.chained_assignment = None  # default='warn'
        #
		# # Joining description
		# desc_df = pd.DataFrame({'description':desc}, index = alpha_values.index)
		# join_df = alpha_values.join(desc_df)


# -------------------------------------------------------------------------------------------------
# # Get numeric list
# t = df.ix[df1.dropna().index.values]
# t['result'] = t.result.astype('float')
#
# # Get alpha list
# # index = df1['result'].index[df1['result'].apply(np.isnan)]
# # z = df.ix[index]
#
# # Selecting data according to test number
# q = t[t['test_number'] == tx].groupby('result')['Count'].sum()
# numeric_values = q.to_frame().reset_index()
# # alpha_values = z[z['test_number'] == tx].sort_values(by=['Count'],ascending=False)
#
# # Draw scatter plot
# jsonDf = numeric_values.to_json(orient='records')
# return jsonDf
