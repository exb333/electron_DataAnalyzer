import pandas as pd

def scatter_plot(numeric_values):
    jsonDf = numeric_values.to_json(orient='records')
    return jsonDf
