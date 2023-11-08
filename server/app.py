import random
import uuid
import time
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Store session IDs and their data in a dictionary
session_data = {}

# Load dummy text data from a file
with open('./dummy-data/dummy_text.txt', 'r') as file:
    dummy_text = file.read()


@app.route('/api/session', methods=['GET'])
def get_session():
    # Verify the x-functions-key header
    provided_key = request.headers.get('x-functions-key')
    # Replace with your actual expected key
    expected_key = "dummy_functions_key"

    if provided_key != expected_key:
        return jsonify({'error': 'Invalid x-functions-key'}), 403

    new_session_id = str(uuid.uuid4())  # Generate a new random session ID
    # Initialize an empty list for the new session
    session_data[new_session_id] = []
    return jsonify({'session': new_session_id})


def generate_dummy_actions():
    actions_list = [
        {
            "action": "Surging healthcare spend and investment",
            "information": "Global healthcare spend is thought to have grown more than 40% between 2018 and 2022, reaching $12 trillion. At the same time, healthcare investments have also reached record highs in recent years, with attention on areas such as gene immunotherapy and new mRNA vaccines for diseases such as Zika and malaria."
        },
        {
            "action": "Scientific advancements",
            "information": "Alongside this investment, we are also seeing progress in treatments and diagnosis of disease. Precision medicine using biomarkers is increasingly being used, while advancements in liquid biopsies, for example, are changing how cancer is detected."
        },
        {
            "action": "Digital innovation and AI",
            "information": "The pandemic fired rapid digitalization across healthcare, as with other sectors. And in 2021, digital investments in the healthcare sector nearly doubled to $57 billion, with an emphasis on telehealth and mental health. Tech companies are increasingly focusing on healthcare, while digital health start-ups are also growing rapidly."
        },
        {
            "action": "Alternative care models",
            "information": "We are increasingly recognizing the importance and power of care provision outside of hospitals, in homes and communities. In fact, growth in expenditure on health provision and care at home is expected to outpace healthcare spend in nearly all other areas. This investment will be used to further home diagnostics, home-administered drug delivery systems and patient monitoring devices."
        }
    ]

    return actions_list

def generate_dummy_trends():
    trends = [
    {
        "Date": "1/2/2019",
        "S&P 500": "1831.98",
        "NASDAQ": "4143.07",
        "uid": 0
    }, {
        "Date": "1/3/2019",
        "S&P 500": "1831.37",
        "NASDAQ": "4131.91",
        "uid": 1
    }, {
        "Date": "1/6/2019",
        "S&P 500": "1826.77",
        "NASDAQ": "4113.68",
        "uid": 2
    }, {
        "Date": "1/7/2019",
        "S&P 500": "1837.88",
        "NASDAQ": "4153.18",
        "uid": 3
    }, {
        "Date": "1/8/2019",
        "S&P 500": "1837.49",
        "NASDAQ": "4165.61",
        "uid": 4
    }, {
        "Date": "1/9/2019",
        "S&P 500": "1838.13",
        "NASDAQ": "4156.19",
        "uid": 5
    }, {
        "Date": "1/10/2019",
        "S&P 500": "1842.37",
        "NASDAQ": "4174.67",
        "uid": 6
    }, {
        "Date": "1/13/2019",
        "S&P 500": "1819.2",
        "NASDAQ": "4113.3",
        "uid": 7
    }, {
        "Date": "1/14/2019",
        "S&P 500": "1838.88",
        "NASDAQ": "4183.02",
        "uid": 8
    }, {
        "Date": "1/15/2019",
        "S&P 500": "1848.38",
        "NASDAQ": "4214.88",
        "uid": 9
    }, {
        "Date": "1/16/2019",
        "S&P 500": "1845.89",
        "NASDAQ": "4218.69",
        "uid": 10
    }, {
        "Date": "1/17/2019",
        "S&P 500": "1838.7",
        "NASDAQ": "4197.58",
        "uid": 11
    }, {
        "Date": "1/21/2019",
        "S&P 500": "1843.8",
        "NASDAQ": "4225.76",
        "uid": 12
    }, {
        "Date": "1/22/2019",
        "S&P 500": "1844.86",
        "NASDAQ": "4243",
        "uid": 13
    }, {
        "Date": "1/23/2019",
        "S&P 500": "1828.46",
        "NASDAQ": "4218.88",
        "uid": 14
    }, {
        "Date": "1/24/2019",
        "S&P 500": "1790.29",
        "NASDAQ": "4128.17",
        "uid": 15
    }, {
        "Date": "1/27/2019",
        "S&P 500": "1781.56",
        "NASDAQ": "4083.61",
        "uid": 16
    }, {
        "Date": "1/28/2019",
        "S&P 500": "1792.5",
        "NASDAQ": "4097.96",
        "uid": 17
    }, {
        "Date": "1/29/2019",
        "S&P 500": "1774.2",
        "NASDAQ": "4051.43",
        "uid": 18
    }, {
        "Date": "1/30/2019",
        "S&P 500": "1794.19",
        "NASDAQ": "4123.13",
        "uid": 19
    }, {
        "Date": "1/31/2019",
        "S&P 500": "1782.59",
        "NASDAQ": "4103.88",
        "uid": 20
    }, {
        "Date": "2/3/2019",
        "S&P 500": "1741.89",
        "NASDAQ": "3996.96",
        "uid": 21
    }, {
        "Date": "2/4/2019",
        "S&P 500": "1755.2",
        "NASDAQ": "4031.52",
        "uid": 22
    }, {
        "Date": "2/5/2019",
        "S&P 500": "1751.64",
        "NASDAQ": "4011.55",
        "uid": 23
    }, {
        "Date": "2/6/2019",
        "S&P 500": "1773.43",
        "NASDAQ": "4057.12",
        "uid": 24
    }, {
        "Date": "2/7/2019",
        "S&P 500": "1797.02",
        "NASDAQ": "4125.86",
        "uid": 25
    }, {
        "Date": "2/10/2019",
        "S&P 500": "1799.84",
        "NASDAQ": "4148.17",
        "uid": 26
    }, {
        "Date": "2/11/2019",
        "S&P 500": "1819.75",
        "NASDAQ": "4191.05",
        "uid": 27
    }, {
        "Date": "2/12/2019",
        "S&P 500": "1819.26",
        "NASDAQ": "4201.29",
        "uid": 28
    }, {
        "Date": "2/13/2019",
        "S&P 500": "1829.83",
        "NASDAQ": "4240.67",
        "uid": 29
    }, {
        "Date": "2/14/2019",
        "S&P 500": "1838.63",
        "NASDAQ": "4244.02",
        "uid": 30
    }, {
        "Date": "2/18/2019",
        "S&P 500": "1840.76",
        "NASDAQ": "4272.78",
        "uid": 31
    }, {
        "Date": "2/19/2019",
        "S&P 500": "1828.75",
        "NASDAQ": "4237.95",
        "uid": 32
    }, {
        "Date": "2/20/2019",
        "S&P 500": "1839.78",
        "NASDAQ": "4267.55",
        "uid": 33
    }, {
        "Date": "2/21/2019",
        "S&P 500": "1836.25",
        "NASDAQ": "4263.41",
        "uid": 34
    }, {
        "Date": "2/24/2019",
        "S&P 500": "1847.61",
        "NASDAQ": "4292.97",
        "uid": 35
    }, {
        "Date": "2/25/2019",
        "S&P 500": "1845.12",
        "NASDAQ": "4287.59",
        "uid": 36
    }, {
        "Date": "2/26/2019",
        "S&P 500": "1845.16",
        "NASDAQ": "4292.06",
        "uid": 37
    }, {
        "Date": "2/27/2019",
        "S&P 500": "1854.29",
        "NASDAQ": "4318.93",
        "uid": 38
    }, {
        "Date": "2/28/2019",
        "S&P 500": "1859.45",
        "NASDAQ": "4308.12",
        "uid": 39
    }, {
        "Date": "3/3/2019",
        "S&P 500": "1845.73",
        "NASDAQ": "4277.3",
        "uid": 40
    }, {
        "Date": "3/4/2019",
        "S&P 500": "1873.91",
        "NASDAQ": "4351.97",
        "uid": 41
    }, {
        "Date": "3/5/2019",
        "S&P 500": "1873.81",
        "NASDAQ": "4357.97",
        "uid": 42
    }, {
        "Date": "3/6/2019",
        "S&P 500": "1877.03",
        "NASDAQ": "4352.13",
        "uid": 43
    }, {
        "Date": "3/7/2019",
        "S&P 500": "1878.04",
        "NASDAQ": "4336.22",
        "uid": 44
    }, {
        "Date": "3/10/2019",
        "S&P 500": "1877.17",
        "NASDAQ": "4334.45",
        "uid": 45
    }, {
        "Date": "3/11/2019",
        "S&P 500": "1867.63",
        "NASDAQ": "4307.19",
        "uid": 46
    }, {
        "Date": "3/12/2019",
        "S&P 500": "1868.2",
        "NASDAQ": "4323.33",
        "uid": 47
    }, {
        "Date": "3/13/2019",
        "S&P 500": "1846.34",
        "NASDAQ": "4260.42",
        "uid": 48
    }, {
        "Date": "3/14/2019",
        "S&P 500": "1841.13",
        "NASDAQ": "4245.4",
        "uid": 49
    }, {
        "Date": "3/17/2019",
        "S&P 500": "1858.83",
        "NASDAQ": "4279.95",
        "uid": 50
    }, {
        "Date": "3/18/2019",
        "S&P 500": "1872.25",
        "NASDAQ": "4333.31",
        "uid": 51
    }, {
        "Date": "3/19/2019",
        "S&P 500": "1860.77",
        "NASDAQ": "4307.6",
        "uid": 52
    }, {
        "Date": "3/20/2019",
        "S&P 500": "1872.01",
        "NASDAQ": "4319.29",
        "uid": 53
    }, {
        "Date": "3/21/2019",
        "S&P 500": "1866.52",
        "NASDAQ": "4276.79",
        "uid": 54
    }, {
        "Date": "3/24/2019",
        "S&P 500": "1857.44",
        "NASDAQ": "4226.39",
        "uid": 55
    }, {
        "Date": "3/25/2019",
        "S&P 500": "1865.62",
        "NASDAQ": "4234.27",
        "uid": 56
    }, {
        "Date": "3/26/2019",
        "S&P 500": "1852.56",
        "NASDAQ": "4173.58",
        "uid": 57
    }, {
        "Date": "3/27/2019",
        "S&P 500": "1849.04",
        "NASDAQ": "4151.23",
        "uid": 58
    }, {
        "Date": "3/28/2019",
        "S&P 500": "1857.62",
        "NASDAQ": "4155.76",
        "uid": 59
    }, {
        "Date": "3/31/2019",
        "S&P 500": "1872.34",
        "NASDAQ": "4198.99",
        "uid": 60
    }, {
        "Date": "4/1/2019",
        "S&P 500": "1885.52",
        "NASDAQ": "4268.04",
        "uid": 61
    }, {
        "Date": "4/2/2019",
        "S&P 500": "1890.9",
        "NASDAQ": "4276.46",
        "uid": 62
    }, {
        "Date": "4/3/2019",
        "S&P 500": "1888.77",
        "NASDAQ": "4237.74",
        "uid": 63
    }, {
        "Date": "4/4/2019",
        "S&P 500": "1865.09",
        "NASDAQ": "4127.73",
        "uid": 64
    }, {
        "Date": "4/7/2019",
        "S&P 500": "1845.04",
        "NASDAQ": "4079.75",
        "uid": 65
    }, {
        "Date": "4/8/2019",
        "S&P 500": "1851.96",
        "NASDAQ": "4112.99",
        "uid": 66
    }, {
        "Date": "4/9/2019",
        "S&P 500": "1872.18",
        "NASDAQ": "4183.9",
        "uid": 67
    }, {
        "Date": "4/10/2019",
        "S&P 500": "1833.08",
        "NASDAQ": "4054.11",
        "uid": 68
    }, {
        "Date": "4/11/2019",
        "S&P 500": "1815.69",
        "NASDAQ": "3999.73",
        "uid": 69
    }, {
        "Date": "4/14/2019",
        "S&P 500": "1830.61",
        "NASDAQ": "4022.69",
        "uid": 70
    }, {
        "Date": "4/15/2019",
        "S&P 500": "1842.98",
        "NASDAQ": "4034.16",
        "uid": 71
    }, {
        "Date": "4/16/2019",
        "S&P 500": "1862.31",
        "NASDAQ": "4086.23",
        "uid": 72
    }, {
        "Date": "4/17/2019",
        "S&P 500": "1864.85",
        "NASDAQ": "4095.52",
        "uid": 73
    }, {
        "Date": "4/21/2019",
        "S&P 500": "1871.89",
        "NASDAQ": "4121.55",
        "uid": 74
    }, {
        "Date": "4/22/2019",
        "S&P 500": "1879.55",
        "NASDAQ": "4161.46",
        "uid": 75
    }, {
        "Date": "4/23/2019",
        "S&P 500": "1875.39",
        "NASDAQ": "4126.97",
        "uid": 76
    }, {
        "Date": "4/24/2019",
        "S&P 500": "1878.61",
        "NASDAQ": "4148.34",
        "uid": 77
    }, {
        "Date": "4/25/2019",
        "S&P 500": "1863.4",
        "NASDAQ": "4075.56",
        "uid": 78
    }, {
        "Date": "4/28/2019",
        "S&P 500": "1869.43",
        "NASDAQ": "4074.4",
        "uid": 79
    }, {
        "Date": "4/29/2019",
        "S&P 500": "1878.33",
        "NASDAQ": "4103.54",
        "uid": 80
    }, {
        "Date": "4/30/2019",
        "S&P 500": "1883.95",
        "NASDAQ": "4114.56",
        "uid": 81
    }, {
        "Date": "5/1/2019",
        "S&P 500": "1883.68",
        "NASDAQ": "4127.45",
        "uid": 82
    }, {
        "Date": "5/2/2019",
        "S&P 500": "1881.14",
        "NASDAQ": "4123.9",
        "uid": 83
    }, {
        "Date": "5/5/2019",
        "S&P 500": "1884.66",
        "NASDAQ": "4138.06",
        "uid": 84
    }, {
        "Date": "5/6/2019",
        "S&P 500": "1867.72",
        "NASDAQ": "4080.76",
        "uid": 85
    }, {
        "Date": "5/7/2019",
        "S&P 500": "1878.21",
        "NASDAQ": "4067.67",
        "uid": 86
    }, {
        "Date": "5/8/2019",
        "S&P 500": "1875.63",
        "NASDAQ": "4051.5",
        "uid": 87
    }, {
        "Date": "5/9/2019",
        "S&P 500": "1878.48",
        "NASDAQ": "4071.87",
        "uid": 88
    }, {
        "Date": "5/12/2019",
        "S&P 500": "1896.65",
        "NASDAQ": "4143.86",
        "uid": 89
    }, {
        "Date": "5/13/2019",
        "S&P 500": "1897.45",
        "NASDAQ": "4130.17",
        "uid": 90
    }, {
        "Date": "5/14/2019",
        "S&P 500": "1888.53",
        "NASDAQ": "4100.63",
        "uid": 91
    }, {
        "Date": "5/15/2019",
        "S&P 500": "1870.85",
        "NASDAQ": "4069.29",
        "uid": 92
    }, {
        "Date": "5/16/2019",
        "S&P 500": "1877.86",
        "NASDAQ": "4090.59",
        "uid": 93
    }, {
        "Date": "5/19/2019",
        "S&P 500": "1885.08",
        "NASDAQ": "4125.81",
        "uid": 94
    }, {
        "Date": "5/20/2019",
        "S&P 500": "1872.83",
        "NASDAQ": "4096.89",
        "uid": 95
    }, {
        "Date": "5/21/2019",
        "S&P 500": "1888.03",
        "NASDAQ": "4131.54",
        "uid": 96
    }, {
        "Date": "5/22/2019",
        "S&P 500": "1892.49",
        "NASDAQ": "4154.34",
        "uid": 97
    }, {
        "Date": "5/23/2019",
        "S&P 500": "1900.53",
        "NASDAQ": "4185.81",
        "uid": 98
    }, {
        "Date": "5/27/2019",
        "S&P 500": "1911.91",
        "NASDAQ": "4237.07",
        "uid": 99
    }, {
        "Date": "5/28/2019",
        "S&P 500": "1909.78",
        "NASDAQ": "4225.08",
        "uid": 100
    }, {
        "Date": "5/29/2019",
        "S&P 500": "1920.03",
        "NASDAQ": "4247.95",
        "uid": 101
    }, {
        "Date": "5/30/2019",
        "S&P 500": "1923.57",
        "NASDAQ": "4242.62",
        "uid": 102
    }, {
        "Date": "6/2/2019",
        "S&P 500": "1924.97",
        "NASDAQ": "4237.2",
        "uid": 103
    }, {
        "Date": "6/3/2019",
        "S&P 500": "1924.24",
        "NASDAQ": "4234.08",
        "uid": 104
    }, {
        "Date": "6/4/2019",
        "S&P 500": "1927.88",
        "NASDAQ": "4251.64",
        "uid": 105
    }, {
        "Date": "6/5/2019",
        "S&P 500": "1940.46",
        "NASDAQ": "4296.23",
        "uid": 106
    }, {
        "Date": "6/6/2019",
        "S&P 500": "1949.44",
        "NASDAQ": "4321.4",
        "uid": 107
    }, {
        "Date": "6/9/2019",
        "S&P 500": "1951.27",
        "NASDAQ": "4336.24",
        "uid": 108
    }, {
        "Date": "6/10/2019",
        "S&P 500": "1950.79",
        "NASDAQ": "4338",
        "uid": 109
    }, {
        "Date": "6/11/2019",
        "S&P 500": "1943.89",
        "NASDAQ": "4331.93",
        "uid": 110
    }, {
        "Date": "6/12/2019",
        "S&P 500": "1930.11",
        "NASDAQ": "4297.63",
        "uid": 111
    }, {
        "Date": "6/13/2019",
        "S&P 500": "1936.16",
        "NASDAQ": "4310.65",
        "uid": 112
    }, {
        "Date": "6/16/2019",
        "S&P 500": "1937.78",
        "NASDAQ": "4321.1",
        "uid": 113
    }, {
        "Date": "6/17/2019",
        "S&P 500": "1941.99",
        "NASDAQ": "4337.23",
        "uid": 114
    }, {
        "Date": "6/18/2019",
        "S&P 500": "1956.98",
        "NASDAQ": "4362.84",
        "uid": 115
    }, {
        "Date": "6/19/2019",
        "S&P 500": "1959.48",
        "NASDAQ": "4359.33",
        "uid": 116
    }, {
        "Date": "6/20/2019",
        "S&P 500": "1962.87",
        "NASDAQ": "4368.04",
        "uid": 117
    }, {
        "Date": "6/23/2019",
        "S&P 500": "1962.61",
        "NASDAQ": "4368.68",
        "uid": 118
    }, {
        "Date": "6/24/2019",
        "S&P 500": "1949.98",
        "NASDAQ": "4350.35",
        "uid": 119
    }, {
        "Date": "6/25/2019",
        "S&P 500": "1959.53",
        "NASDAQ": "4379.76",
        "uid": 120
    }, {
        "Date": "6/26/2019",
        "S&P 500": "1957.22",
        "NASDAQ": "4379.05",
        "uid": 121
    }, {
        "Date": "6/27/2019",
        "S&P 500": "1960.96",
        "NASDAQ": "4397.93",
        "uid": 122
    }, {
        "Date": "6/30/2019",
        "S&P 500": "1960.23",
        "NASDAQ": "4408.18",
        "uid": 123
    }, {
        "Date": "7/1/2019",
        "S&P 500": "1973.32",
        "NASDAQ": "4458.65",
        "uid": 124
    }, {
        "Date": "7/2/2019",
        "S&P 500": "1974.62",
        "NASDAQ": "4457.73",
        "uid": 125
    }, {
        "Date": "7/3/2019",
        "S&P 500": "1985.44",
        "NASDAQ": "4485.93",
        "uid": 126
    }, {
        "Date": "7/7/2019",
        "S&P 500": "1977.65",
        "NASDAQ": "4451.53",
        "uid": 127
    }, {
        "Date": "7/8/2019",
        "S&P 500": "1963.71",
        "NASDAQ": "4391.46",
        "uid": 128
    }, {
        "Date": "7/9/2019",
        "S&P 500": "1972.83",
        "NASDAQ": "4419.03",
        "uid": 129
    }, {
        "Date": "7/10/2019",
        "S&P 500": "1964.68",
        "NASDAQ": "4396.2",
        "uid": 130
    }, {
        "Date": "7/11/2019",
        "S&P 500": "1967.57",
        "NASDAQ": "4415.49",
        "uid": 131
    }, {
        "Date": "7/14/2019",
        "S&P 500": "1977.1",
        "NASDAQ": "4440.42",
        "uid": 132
    }, {
        "Date": "7/15/2019",
        "S&P 500": "1973.28",
        "NASDAQ": "4416.39",
        "uid": 133
    }, {
        "Date": "7/16/2019",
        "S&P 500": "1981.57",
        "NASDAQ": "4425.97",
        "uid": 134
    }, {
        "Date": "7/17/2019",
        "S&P 500": "1958.12",
        "NASDAQ": "4363.45",
        "uid": 135
    }, {
        "Date": "7/18/2019",
        "S&P 500": "1978.22",
        "NASDAQ": "4432.15",
        "uid": 136
    }, {
        "Date": "7/21/2019",
        "S&P 500": "1973.63",
        "NASDAQ": "4424.7",
        "uid": 137
    }, {
        "Date": "7/22/2019",
        "S&P 500": "1983.53",
        "NASDAQ": "4456.02",
        "uid": 138
    }, {
        "Date": "7/23/2019",
        "S&P 500": "1987.01",
        "NASDAQ": "4473.7",
        "uid": 139
    }, {
        "Date": "7/24/2019",
        "S&P 500": "1987.98",
        "NASDAQ": "4472.11",
        "uid": 140
    }, {
        "Date": "7/25/2019",
        "S&P 500": "1978.34",
        "NASDAQ": "4449.56",
        "uid": 141
    }, {
        "Date": "7/28/2019",
        "S&P 500": "1978.91",
        "NASDAQ": "4444.91",
        "uid": 142
    }, {
        "Date": "7/29/2019",
        "S&P 500": "1969.95",
        "NASDAQ": "4442.7",
        "uid": 143
    }, {
        "Date": "7/30/2019",
        "S&P 500": "1970.07",
        "NASDAQ": "4462.9",
        "uid": 144
    }, {
        "Date": "7/31/2019",
        "S&P 500": "1930.67",
        "NASDAQ": "4369.77",
        "uid": 145
    }, {
        "Date": "8/1/2019",
        "S&P 500": "1925.15",
        "NASDAQ": "4352.64",
        "uid": 146
    }, {
        "Date": "8/4/2019",
        "S&P 500": "1938.99",
        "NASDAQ": "4383.89",
        "uid": 147
    }, {
        "Date": "8/5/2019",
        "S&P 500": "1920.21",
        "NASDAQ": "4352.84",
        "uid": 148
    }, {
        "Date": "8/6/2019",
        "S&P 500": "1920.24",
        "NASDAQ": "4355.05",
        "uid": 149
    }, {
        "Date": "8/7/2019",
        "S&P 500": "1909.57",
        "NASDAQ": "4334.97",
        "uid": 150
    }, {
        "Date": "8/8/2019",
        "S&P 500": "1931.59",
        "NASDAQ": "4370.9",
        "uid": 151
    }, {
        "Date": "8/11/2019",
        "S&P 500": "1936.92",
        "NASDAQ": "4401.33",
        "uid": 152
    }, {
        "Date": "8/12/2019",
        "S&P 500": "1933.75",
        "NASDAQ": "4389.25",
        "uid": 153
    }, {
        "Date": "8/13/2019",
        "S&P 500": "1946.72",
        "NASDAQ": "4434.13",
        "uid": 154
    }, {
        "Date": "8/14/2019",
        "S&P 500": "1955.18",
        "NASDAQ": "4453",
        "uid": 155
    }, {
        "Date": "8/15/2019",
        "S&P 500": "1955.06",
        "NASDAQ": "4464.93",
        "uid": 156
    }, {
        "Date": "8/18/2019",
        "S&P 500": "1971.74",
        "NASDAQ": "4508.31",
        "uid": 157
    }, {
        "Date": "8/19/2019",
        "S&P 500": "1981.6",
        "NASDAQ": "4527.51",
        "uid": 158
    }, {
        "Date": "8/20/2019",
        "S&P 500": "1986.51",
        "NASDAQ": "4526.48",
        "uid": 159
    }, {
        "Date": "8/21/2019",
        "S&P 500": "1992.37",
        "NASDAQ": "4532.1",
        "uid": 160
    }, {
        "Date": "8/22/2019",
        "S&P 500": "1988.4",
        "NASDAQ": "4538.55",
        "uid": 161
    }, {
        "Date": "8/25/2019",
        "S&P 500": "1997.92",
        "NASDAQ": "4557.35",
        "uid": 162
    }, {
        "Date": "8/26/2019",
        "S&P 500": "2000.02",
        "NASDAQ": "4570.64",
        "uid": 163
    }, {
        "Date": "8/27/2019",
        "S&P 500": "2000.12",
        "NASDAQ": "4569.62",
        "uid": 164
    }, {
        "Date": "8/28/2019",
        "S&P 500": "1996.74",
        "NASDAQ": "4557.7",
        "uid": 165
    }, {
        "Date": "8/29/2019",
        "S&P 500": "2003.37",
        "NASDAQ": "4580.27",
        "uid": 166
    }, {
        "Date": "9/2/2019",
        "S&P 500": "2002.28",
        "NASDAQ": "4598.19",
        "uid": 167
    }, {
        "Date": "9/3/2019",
        "S&P 500": "2000.72",
        "NASDAQ": "4572.56",
        "uid": 168
    }, {
        "Date": "9/4/2019",
        "S&P 500": "1997.65",
        "NASDAQ": "4562.29",
        "uid": 169
    }, {
        "Date": "9/5/2019",
        "S&P 500": "2007.71",
        "NASDAQ": "4582.9",
        "uid": 170
    }, {
        "Date": "9/8/2019",
        "S&P 500": "2001.54",
        "NASDAQ": "4592.29",
        "uid": 171
    }, {
        "Date": "9/9/2019",
        "S&P 500": "1988.44",
        "NASDAQ": "4552.29",
        "uid": 172
    }, {
        "Date": "9/10/2019",
        "S&P 500": "1995.69",
        "NASDAQ": "4586.52",
        "uid": 173
    }, {
        "Date": "9/11/2019",
        "S&P 500": "1997.45",
        "NASDAQ": "4591.81",
        "uid": 174
    }, {
        "Date": "9/12/2019",
        "S&P 500": "1985.54",
        "NASDAQ": "4567.6",
        "uid": 175
    }, {
        "Date": "9/15/2019",
        "S&P 500": "1984.13",
        "NASDAQ": "4518.9",
        "uid": 176
    }, {
        "Date": "9/16/2019",
        "S&P 500": "1998.98",
        "NASDAQ": "4552.76",
        "uid": 177
    }, {
        "Date": "9/17/2019",
        "S&P 500": "2001.57",
        "NASDAQ": "4562.19",
        "uid": 178
    }, {
        "Date": "9/18/2019",
        "S&P 500": "2011.36",
        "NASDAQ": "4593.43",
        "uid": 179
    }, {
        "Date": "9/19/2019",
        "S&P 500": "2010.4",
        "NASDAQ": "4579.79",
        "uid": 180
    }, {
        "Date": "9/22/2019",
        "S&P 500": "1994.29",
        "NASDAQ": "4527.69",
        "uid": 181
    }, {
        "Date": "9/23/2019",
        "S&P 500": "1982.77",
        "NASDAQ": "4508.69",
        "uid": 182
    }, {
        "Date": "9/24/2019",
        "S&P 500": "1998.3",
        "NASDAQ": "4555.22",
        "uid": 183
    }, {
        "Date": "9/25/2019",
        "S&P 500": "1965.99",
        "NASDAQ": "4466.75",
        "uid": 184
    }, {
        "Date": "9/26/2019",
        "S&P 500": "1982.85",
        "NASDAQ": "4512.19",
        "uid": 185
    }, {
        "Date": "9/29/2019",
        "S&P 500": "1977.8",
        "NASDAQ": "4505.85",
        "uid": 186
    }, {
        "Date": "9/30/2019",
        "S&P 500": "1972.29",
        "NASDAQ": "4493.39",
        "uid": 187
    }, {
        "Date": "10/1/2019",
        "S&P 500": "1946.16",
        "NASDAQ": "4422.09",
        "uid": 188
    }, {
        "Date": "10/2/2019",
        "S&P 500": "1946.17",
        "NASDAQ": "4430.2",
        "uid": 189
    }, {
        "Date": "10/3/2019",
        "S&P 500": "1967.9",
        "NASDAQ": "4475.62",
        "uid": 190
    }, {
        "Date": "10/6/2019",
        "S&P 500": "1964.82",
        "NASDAQ": "4454.8",
        "uid": 191
    }, {
        "Date": "10/7/2019",
        "S&P 500": "1935.1",
        "NASDAQ": "4385.2",
        "uid": 192
    }, {
        "Date": "10/8/2019",
        "S&P 500": "1968.89",
        "NASDAQ": "4468.59",
        "uid": 193
    }, {
        "Date": "10/9/2019",
        "S&P 500": "1928.21",
        "NASDAQ": "4378.34",
        "uid": 194
    }, {
        "Date": "10/10/2019",
        "S&P 500": "1906.13",
        "NASDAQ": "4276.24",
        "uid": 195
    }, {
        "Date": "10/13/2019",
        "S&P 500": "1874.74",
        "NASDAQ": "4213.66",
        "uid": 196
    }, {
        "Date": "10/14/2019",
        "S&P 500": "1877.7",
        "NASDAQ": "4227.17",
        "uid": 197
    }, {
        "Date": "10/15/2019",
        "S&P 500": "1862.49",
        "NASDAQ": "4215.32",
        "uid": 198
    }, {
        "Date": "10/16/2019",
        "S&P 500": "1862.76",
        "NASDAQ": "4217.39",
        "uid": 199
    }, {
        "Date": "10/17/2019",
        "S&P 500": "1886.76",
        "NASDAQ": "4258.44",
        "uid": 200
    }, {
        "Date": "10/20/2019",
        "S&P 500": "1904.01",
        "NASDAQ": "4316.07",
        "uid": 201
    }, {
        "Date": "10/21/2019",
        "S&P 500": "1941.28",
        "NASDAQ": "4419.48",
        "uid": 202
    }, {
        "Date": "10/22/2019",
        "S&P 500": "1927.11",
        "NASDAQ": "4382.85",
        "uid": 203
    }, {
        "Date": "10/23/2019",
        "S&P 500": "1950.82",
        "NASDAQ": "4452.79",
        "uid": 204
    }, {
        "Date": "10/24/2019",
        "S&P 500": "1964.58",
        "NASDAQ": "4483.72",
        "uid": 205
    }, {
        "Date": "10/27/2019",
        "S&P 500": "1961.63",
        "NASDAQ": "4485.93",
        "uid": 206
    }, {
        "Date": "10/28/2019",
        "S&P 500": "1985.05",
        "NASDAQ": "4564.29",
        "uid": 207
    }, {
        "Date": "10/29/2019",
        "S&P 500": "1982.3",
        "NASDAQ": "4549.23",
        "uid": 208
    }, {
        "Date": "10/30/2019",
        "S&P 500": "1994.65",
        "NASDAQ": "4566.14",
        "uid": 209
    }, {
        "Date": "10/31/2019",
        "S&P 500": "2019.05",
        "NASDAQ": "4630.74",
        "uid": 210
    }, {
        "Date": "11/3/2019",
        "S&P 500": "2019.81",
        "NASDAQ": "4638.91",
        "uid": 211
    }, {
        "Date": "11/4/2019",
        "S&P 500": "2012.1",
        "NASDAQ": "4623.64",
        "uid": 212
    }, {
        "Date": "11/5/2019",
        "S&P 500": "2023.57",
        "NASDAQ": "4620.72",
        "uid": 213
    }, {
        "Date": "11/6/2019",
        "S&P 500": "2031.21",
        "NASDAQ": "4638.47",
        "uid": 214
    }, {
        "Date": "11/7/2019",
        "S&P 500": "2031.92",
        "NASDAQ": "4632.53",
        "uid": 215
    }, {
        "Date": "11/10/2019",
        "S&P 500": "2038.26",
        "NASDAQ": "4651.62",
        "uid": 216
    }, {
        "Date": "11/11/2019",
        "S&P 500": "2039.68",
        "NASDAQ": "4660.56",
        "uid": 217
    }, {
        "Date": "11/12/2019",
        "S&P 500": "2038.25",
        "NASDAQ": "4675.14",
        "uid": 218
    }, {
        "Date": "11/13/2019",
        "S&P 500": "2039.33",
        "NASDAQ": "4680.14",
        "uid": 219
    }, {
        "Date": "11/14/2019",
        "S&P 500": "2039.82",
        "NASDAQ": "4688.54",
        "uid": 220
    }, {
        "Date": "11/17/2019",
        "S&P 500": "2041.32",
        "NASDAQ": "4671",
        "uid": 221
    }, {
        "Date": "11/18/2019",
        "S&P 500": "2051.8",
        "NASDAQ": "4702.44",
        "uid": 222
    }, {
        "Date": "11/19/2019",
        "S&P 500": "2048.72",
        "NASDAQ": "4675.71",
        "uid": 223
    }, {
        "Date": "11/20/2019",
        "S&P 500": "2052.75",
        "NASDAQ": "4701.87",
        "uid": 224
    }, {
        "Date": "11/21/2019",
        "S&P 500": "2063.5",
        "NASDAQ": "4712.97",
        "uid": 225
    }, {
        "Date": "11/24/2019",
        "S&P 500": "2069.41",
        "NASDAQ": "4754.89",
        "uid": 226
    }, {
        "Date": "11/25/2019",
        "S&P 500": "2067.03",
        "NASDAQ": "4758.25",
        "uid": 227
    }, {
        "Date": "11/26/2019",
        "S&P 500": "2072.83",
        "NASDAQ": "4787.32",
        "uid": 228
    }, {
        "Date": "11/28/2019",
        "S&P 500": "2067.56",
        "NASDAQ": "4791.63",
        "uid": 229
    }, {
        "Date": "12/1/2019",
        "S&P 500": "2053.44",
        "NASDAQ": "4727.35",
        "uid": 230
    }, {
        "Date": "12/2/2019",
        "S&P 500": "2066.55",
        "NASDAQ": "4755.81",
        "uid": 231
    }, {
        "Date": "12/3/2019",
        "S&P 500": "2074.33",
        "NASDAQ": "4774.47",
        "uid": 232
    }, {
        "Date": "12/4/2019",
        "S&P 500": "2071.92",
        "NASDAQ": "4769.44",
        "uid": 233
    }, {
        "Date": "12/5/2019",
        "S&P 500": "2075.37",
        "NASDAQ": "4780.76",
        "uid": 234
    }, {
        "Date": "12/8/2019",
        "S&P 500": "2060.31",
        "NASDAQ": "4740.69",
        "uid": 235
    }, {
        "Date": "12/9/2019",
        "S&P 500": "2059.82",
        "NASDAQ": "4766.47",
        "uid": 236
    }, {
        "Date": "12/10/2019",
        "S&P 500": "2026.14",
        "NASDAQ": "4684.02",
        "uid": 237
    }, {
        "Date": "12/11/2019",
        "S&P 500": "2035.33",
        "NASDAQ": "4708.16",
        "uid": 238
    }, {
        "Date": "12/12/2019",
        "S&P 500": "2002.33",
        "NASDAQ": "4653.6",
        "uid": 239
    }, {
        "Date": "12/15/2019",
        "S&P 500": "1989.63",
        "NASDAQ": "4605.16",
        "uid": 240
    }, {
        "Date": "12/16/2019",
        "S&P 500": "1972.74",
        "NASDAQ": "4547.83",
        "uid": 241
    }, {
        "Date": "12/17/2019",
        "S&P 500": "2012.89",
        "NASDAQ": "4644.31",
        "uid": 242
    }, {
        "Date": "12/18/2019",
        "S&P 500": "2061.23",
        "NASDAQ": "4748.4",
        "uid": 243
    }, {
        "Date": "12/19/2019",
        "S&P 500": "2070.65",
        "NASDAQ": "4765.38",
        "uid": 244
    }, {
        "Date": "12/22/2019",
        "S&P 500": "2078.54",
        "NASDAQ": "4781.42",
        "uid": 245
    }, {
        "Date": "12/23/2019",
        "S&P 500": "2082.17",
        "NASDAQ": "4765.42",
        "uid": 246
    }, {
        "Date": "12/24/2019",
        "S&P 500": "2081.88",
        "NASDAQ": "4773.47",
        "uid": 247
    }
    ]

    return trends


def generate_dummy_sources():
    # sources_list = [
    #     "https://www.goldmansachs.com/intelligence/the-future-of-healthcare/index.html",
    #     "https://www.forbes.com/sites/forbesagencycouncil/2023/02/16/5-leading-healthcare-trends-for-2023/",
    #     "https://www.weforum.org/agenda/2023/04/world-health-day-healthcare-trends/"
    # ]

    sources_list = [
        {
            "title": "Medtronic plc (MDT) Analyst Ratings, Estimates & Forecasts - Yahoo Finance",
            "link": "https://ﬁnance.yahoo.com/quote/MDT/analysis?p=MDT"
        },
        {
            "title": "Smart Medical Devices Market Size, Current Insights and Demographic Trends 2023-2030",
            "link": "https://www.linkedin.com/pulse/smart-medical-devices-market-size-current-lk1bf/"
        }
    ]
    return sources_list


def generate_dummy_summary():
    summary_list = [
        "During the conversation, various topics were discussed, including account balances, loan options, and card security.",
        "The conversation covered a range of subjects such as mortgage rates, online banking features, and transaction history.",
        "Throughout the conversation, key points were touched upon, including card activation, branch locations, and account access.",
        "Topics like account verification, loan terms, and branch hours were addressed during the course of the conversation.",
        "The conversation delved into areas such as lost card reporting, account security, and online bill payments.",
        "Key areas of discussion included loan applications, credit card inquiries, and measures to prevent fraud.",
        "Subjects like loan eligibility, card replacements, and security protocols were explored during the conversation.",
        "The conversation spanned topics such as account setup, transaction disputes, and mobile banking features.",
        "During the conversation, we covered account types, loan repayment options, and measures to safeguard your information.",
        "Various topics were touched upon during the conversation, including online transfers, card disputes, and account recovery.",
        "Throughout the conversation, we discussed account management, interest rates, and available financial tools.",
        "Key points covered during the conversation include branch access, ATM locations, and reporting suspicious activity.",
        "Subjects such as loan rates, online banking security, and customer support options were discussed.",
        "The conversation included topics such as credit card limits, loan approvals, and digital banking features.",
        "During the discussion, we explored topics like account authentication, loan processing, and security measures.",
        "Key areas of conversation included loan inquiries, online bill payment options, and account statements.",
        "The conversation touched upon subjects like mortgage refinancing, online support, and account updates.",
        "Topics such as account closure procedures, password reset assistance, and card security were discussed.",
        "Throughout the conversation, we covered topics such as loan documentation, interest rates, and loan application status.",
        "Key points of discussion included branch services, account access options, and mobile app features.",
        "During the conversation, we explored topics such as loan terms, branch availability, and account verification.",
        "The conversation covered areas such as online account setup, transaction history, and security measures.",
        "Subjects like card activation, loan repayment schedules, and account verification methods were discussed.",
        "Throughout the conversation, key topics included card safety, loan approval timelines, and online bill payments.",
        "Key areas of conversation included loan eligibility criteria, branch locations, and transaction inquiries.",
        "During the discussion, we touched upon subjects like loan types, online banking security, and card replacement options."
    ]
    return random.choice(summary_list)


def generate_dummy_content():
    content = [
        "Based on the provided documents, the forecast for Medtronic in the upcoming years is as follows:\n\n1. For the year 2024, the average estimated earnings per share (EPS) is 5.11, with a low estimate of 5.08 and a high estimate of 5.16. The average revenue estimate is 32.17B, with a low estimate of 31.95B and a high estimate of 32.44B. \n\n2. For the year 2025, the average estimated EPS is 5.47, with a low estimate of 5.28 and a high estimate of 5.68. The average revenue estimate is 33.64B, with a low estimate of 33.29B and a high estimate of 34.32B.\n\nPlease note that these are estimates and actual performance may vary. Medtronic is also listed as one of the major players in the Smart Medical Devices Market, which is expected to see growth and development until 2030."
    ]

    return content

def generate_dummy_sentiment():
    return random.randint(0, 9)

@app.route('/api/auto-reply', methods=['POST'])
def auto_reply():
    data = request.get_json()
    keyword = data.get('keyword')

    # Search for a matching sentence in dummy text data
    matching_sentence = search_matching_sentence(keyword)

    return jsonify({'response': matching_sentence})


def search_matching_sentence(keyword):
    sentences = dummy_text.split('.')
    matching_sentences = [sentence.strip()
                          for sentence in sentences if keyword in sentence.lower()]

    if matching_sentences:
        return random.choice(matching_sentences)
    else:
        return "Sorry, I couldn't find a matching sentence."


@app.route('/api/message', methods=['POST'])
def send_text():
    # Verify the x-functions-key header
    provided_key = request.headers.get('x-functions-key')
    # Replace with your actual expected key
    expected_key = "dummy_functions_key"

    if provided_key != expected_key:
        return jsonify({'error': 'Invalid x-functions-key'}), 403

    data = request.get_json()

    # Extract data from the JSON request
    session_id = data.get('sessionID')
    speaker = data.get('speaker')
    message = data.get('message')

    # Validate session ID
    # Provide yearly historic trend of MDT Stock performance

    # Enhanced dummy logic for generating summary, and sentiment
    summary = generate_dummy_summary()
    sentiment = generate_dummy_sentiment()

    time.sleep(1)

    response_data = {
        'summary': summary,
        'sentiment': str(sentiment),
    }

    return jsonify(response_data)


@app.route('/api/message-actions', methods=['POST'])
def send_actions():
    # Verify the x-functions-key header
    provided_key = request.headers.get('x-functions-key')
    # Replace with your actual expected key
    expected_key = "dummy_functions_key"

    # if provided_key != expected_key:
    #     return jsonify({'error': 'Invalid x-functions-key'}), 403

    data = request.get_json()

    # Extract data from the JSON request
    session_id = data.get('sessionID')
    speaker = data.get('speaker')
    message = data.get('message')

    # Validate session ID
    # if session_id not in session_data:
    #     return jsonify({'error': 'Invalid sessionID'}), 400

    # # Update session data
    # session_data[session_id].append({'speaker': speaker, 'message': message})

    # Enhanced dummy logic for generating actions, and sources
    # actions = generate_dummy_actions()
    trends = generate_dummy_trends()
    sources = generate_dummy_sources()
    content = generate_dummy_content()

    time.sleep(5)

    response_data = {
        # 'trends': trends,
        # 'actions': actions,
        # 'sources': sources,

        "content": content,
        "data": trends,
        "references": sources,
    }

    return jsonify(response_data)


if __name__ == "__main__":
    app.run(debug=True)
