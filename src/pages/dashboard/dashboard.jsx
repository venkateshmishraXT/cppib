/* eslint-disable react/jsx-no-target-blank */
import React, {useState, useEffect} from "react";
import "./style.css";
import Spinner from "../../components/loader/Spinner";
import LineChart from "../../components/LineChart";
import PieChart from "../../components/PieChart";
import DoughnutChart from "../../components/doughnut";
import Nav from "../../components/Nav";
import ChatBoxCustom from "../../components/customChatbot";
import AnalysisReport from "../../components/report/AnalysisReport";
import { postAction } from "../../config/apiEndpoints";

export const Dashboard = () => {
  const equity_Indices = [{
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
  }];

  const healthcare_topGainers = [{
		Browser: 'Chrome',
		Share: 68.95
	}, {
		Browser: 'Firefox',
		Share: 10.67
	}, {
		Browser: 'IE',
		Share: 6.42
	}, {
		Browser: 'Safari',
		Share: 5.35
	}, {
		Browser: 'Edge',
		Share: 4.2
	}, {
		Browser: 'Other',
		Share: 4.67
	}];

  const healthcare_subSector = [{
		Browser: 'Medical Equipment',
		Share: 30
	}, {
		Browser: 'Drugs',
		Share: 10
	}, {
		Browser: 'Healthcare Facilities',
		Share: 35
	}, {
		Browser: 'Health Tech',
		Share: 25
	}];

  const healthcare_stocks = [{
		stock: 'MGF',
		old: 0.173,
    new: 0.19,
    stockStatus: "Down",
	}, {
		stock: 'SHG',
		old: 0.173,
    new: 0.19,
    stockStatus: "up",
	}];
  const [lineChartData, setLineChartData] = useState([]);
  const [topGainersData, setTopGainersData] = useState([]);
  const [subSectorsData, setSubSectorsData] = useState([]);
  const [analysisResponse, setAnalysisResponse] = useState(null);
  const [actionsResponse, setActionsResponse] = useState(null);
  const [isMessageLoading, setIsMessageLoading] = useState(false);
  const [isActionsLoading, setIsActionsLoading] = useState(false);
  const [summaryHistory, setSummaryHistory] = useState([]);
  const [sentimentHistory, setSentimentHistory] = useState([]);
  const [selectedAction, setSelectedAction] = useState(null);
  const [isChatBotRequestStarted, setIsChatBotRequestStarted] = useState([]);
  const [handleSpinnerLoading, setHandleSpinnerLoading] = useState(true);

  const handleSummaryApiResponse = (data) => {
    setAnalysisResponse(data);
    setSummaryHistory((prevSummaries) => [
      ...prevSummaries,
      data.data.summary,
    ]);
    setSentimentHistory((prevSentiments) => [
      ...prevSentiments,
      data.data.sentiment,
    ]);
  };

  const handleActionApiResponse = (data) => {
    setActionsResponse(data);
  };

  const updateChatBotContainer = () => selectedAction ;

  useEffect(() => {
    setLineChartData(equity_Indices);
    //setTopGainersData(healthcare_topGainers);
    getLLMData("Please provide top gainers in canada", "Pie");
    setSubSectorsData(healthcare_subSector);
    setIsChatBotRequestStarted(false);
  }, [])

  useEffect(() => {
    updateChatBotContainer();
  }, [selectedAction])

  const getLLMData = async (newMessage, component) => {
    try {
        const response = await postAction(
          newMessage,
          "user",
          component
        );
        setHandleSpinnerLoading(true);
        const topGainerResponse = response?.data.choices[0].message.content;
        const unescapedApiResponse = topGainerResponse?.replace(/\\"/g, '"').replace(/\\n/g, '\n');
        const validateResponse = JSON.parse(unescapedApiResponse)
        setTopGainersData(validateResponse.content);
        setHandleSpinnerLoading(false);
      } catch (error) {
        console.error("API request error for top gainers:", error);
      }
  };

  return (
    <div className="dashboard">
      <div className="overlap">
        <img
          className="screenshot"
          alt="Screenshot"
          src="https://c.animaapp.com/UugQg0T9/img/screenshot-2023-10-16-at-11-29-1.png"
        />
        <img
          className="img"
          alt="Screenshot"
          src="https://c.animaapp.com/UugQg0T9/img/screenshot-2023-10-17-at-14-39-1.png"
        />
        <div className="div" />
        <p className="hello-sarah-your">
          <span className="text-wrapper">
            Hello Sarah
            <br />
          </span>
          <span className="span">Your dashboard</span>
        </p>
        <div className="navBar">
          <Nav />
        </div>
        <div className="text-wrapper-2">Sectors</div>
        <div className="botFeed-graphics">
          {isChatBotRequestStarted ? (
          <AnalysisReport
            analysisResponse={analysisResponse}
            actionsResponse={actionsResponse}
            isMessageLoading={isMessageLoading}
            isActionsLoading={isActionsLoading}
            summaryHistory={summaryHistory}
            sentimentHistory={sentimentHistory}
            setSelectedAction={setSelectedAction}
          />
          ) : (" ")}
        </div>
        <div className="news-feeds">
          <div className="m-a-headlines-news">M&amp;A Headlines &amp; News</div>
          <div className="news">
          <div className="frame-14">
          <div className="group-27">
            <img className="group-28" alt="Group" src="https://c.animaapp.com/UugQg0T9/img/group-20-2@2x.png" />
            <div className="frame-15">
              <div className="text-wrapper-23">16 January 2023</div>
              <p className="text-wrapper-24"><a target="_blank"  href="https://www.astrazeneca.com/media-centre/press-releases/2023/acquisition-of-neogene-therapeutics-completed.html">Acquisition of Neogene Therapeutics completed</a></p>
              <div className="text-wrapper-25">AstraZeneca PLC</div>
            </div>
          </div>
          <div className="group-29">
            <img className="group-30" alt="Group" src="https://c.animaapp.com/UugQg0T9/img/group-20-1@2x.png" />
            <div className="frame-16">
              <div className="text-wrapper-23">29 November 2022</div>
              <p className="text-wrapper-24"><a target="_blank" href="https://www.astrazeneca.com/media-centre/press-releases/2022/astrazeneca-to-acquire-neogene-therapeutics-accelerating-ambition-in-oncology-cell-therapy.html#:~:text=AstraZeneca%20will%20acquire%20all%20outstanding,based%20and%20non%2Dcontingent%20consideration.">AstraZeneca acquires Neogene Therapeutics for $320 Million</a>
              </p>
              <div className="text-wrapper-26">AstraZeneca PLC</div>
            </div>
          </div>
          <div className="group-31">
            <img className="group-32" alt="Group" src="https://c.animaapp.com/UugQg0T9/img/group-20@2x.png" />
            <div className="frame-17">
              <div className="text-wrapper-23">29 November 2022</div>
              <p className="text-wrapper-24">
                <a target="_blank" href="https://www.fiercebiotech.com/biotech/astrazeneca-forges-deeper-cell-therapies-200m-takeover-solid-tumor-tcr-biotech">AstraZeneca forges deeper into cell therapies with $200M takeover of solid tumor TCR Biotech</a>
              </p>
              <div className="text-wrapper-27">Fierce Biotech</div>
            </div>
          </div>
        </div>
          </div>
          <div className="stocks-feed">
            <div className="text-wrapper-6">Today’s change</div>
            <div className="frame">
            <div className="frame-wrapper positive">
            <div className="frame-2">
              <div className="text-wrapper-3">Manulife Global Fund - Healthcare Fund AA</div>
              <div className="frame-3">
                <div className="text-wrapper-4">0.173 0.19%</div>
                <img className="arrow-up" alt="Arrow up" src="/assets/arrow-up.svg" />
              </div>
            </div>
          </div>
          <div className="frame-wrapper">
            <div className="frame-2">
              <div className="text-wrapper-3">Spire Healthcare Group PLC</div>
              <div className="frame-3">
                <div className="text-wrapper-4">-10.622 -8.28%</div>
                <img className="arrow-up" alt="Arrow up" src="https://c.animaapp.com/UugQg0T9/img/arrow-up-3.svg" />
              </div>
            </div>
          </div>
          <div className="div-wrapper">
            <div className="overlap-group">
              <img className="arrow-up-2" alt="Arrow up" src="https://c.animaapp.com/UugQg0T9/img/arrow-up-2@2x.png" />
              <div className="frame-4">
                <p className="p">Polar Capital Global Healthcare ZDP 2024</p>
                <div className="frame-5">
                  <div className="element">
                    -10.622
                    <br />
                    -8.28%
                  </div>
                  <img className="arrow-up" alt="Arrow up" src="https://c.animaapp.com/UugQg0T9/img/arrow-up-1.svg" />
                </div>
              </div>
            </div>
          </div>
          <div className="div-wrapper">
            <div className="frame-6">
              <p className="text-wrapper-5">VanEck Genomics and Healthcare Innovators UCITS ETF</p>
              <div className="frame-7">
                <div className="element">
                  -14.768
                  <br />
                  -15.45%
                </div>
                <img className="arrow-up" alt="Arrow up" src="https://c.animaapp.com/UugQg0T9/img/arrow-up.svg" />
              </div>
            </div>
          </div>
            </div>
          </div>

        </div>
        <div className="group-wrapper">
          <div className="chat-wrapper">
            <img className="chat" alt="Chat" src="https://c.animaapp.com/UugQg0T9/img/chat-1-1.svg" />
          </div>
        </div>
        <img
          className="CPP-investment-board"
          alt="Cpp investment board"
          src="https://c.animaapp.com/UugQg0T9/img/cpp-investment-board-logo-2@2x.png"
        />
        <div className="text-wrapper-7">Markets Data</div>
        <div className="overlap-wrapper">
          <div className="overlap-2">
            <div className="overlap-group-wrapper">
              <div className="overlap-group-2">
                <div className="rectangle-2" />
                <img className="group-2" alt="Group" src="https://c.animaapp.com/UugQg0T9/img/group-11.png" />
              </div>
            </div>
            <div className="text-wrapper-8">Equity Indices</div>
            <div className="group-3">
              <div className="overlap-3">
                <div className="frame-8">
                  <div className="frame-9">
                    <div className="text-wrapper-9">S&amp;P 500</div>
                    <img className="vector" alt="Vector" src="https://c.animaapp.com/UugQg0T9/img/vector-5.svg" />
                  </div>
                  <div className="frame-9">
                    <div className="text-wrapper-9">Dow</div>
                    <img className="vector" alt="Vector" src="https://c.animaapp.com/UugQg0T9/img/vector-4.svg" />
                  </div>
                  <div className="frame-9">
                    <div className="text-wrapper-9">Nikkei</div>
                    <img className="vector" alt="Vector" src="https://c.animaapp.com/UugQg0T9/img/vector-3.svg" />
                  </div>
                </div>
                <img className="group-4" alt="Group" src="https://c.animaapp.com/UugQg0T9/img/group-73@2x.png" />
                <img className="group-5" alt="Group" src="https://c.animaapp.com/UugQg0T9/img/group-74@2x.png" />
                <img className="group-6" alt="Group" src="https://c.animaapp.com/UugQg0T9/img/group-75@2x.png" />
              </div>
            </div>
            <div className="group-7">
              <LineChart lineChartData={lineChartData} />
            </div>
          </div>
        </div>
        <div className="frame-10">
          <div className="frame-11">
            <div className="text-wrapper-18">Healthcare</div>
          </div>
          <div className="frame-12">
            <div className="text-wrapper-19">Climate</div>
          </div>
          <div className="frame-12">
            <div className="text-wrapper-19">Technology</div>
          </div>
          <div className="frame-12">
            <div className="text-wrapper-19">All</div>
          </div>
        </div>
        <div className="frame-13">
          <div className="frame-11">
            <div className="text-wrapper-18">Global</div>
          </div>
          <div className="frame-12">
            <div className="text-wrapper-19">Americas</div>
          </div>
          <div className="frame-12">
            <div className="text-wrapper-19">Europe</div>
          </div>
          <div className="frame-12">
            <div className="text-wrapper-19">Asia</div>
          </div>
          <div className="frame-12">
            <div className="text-wrapper-19">Africa</div>
          </div>
        </div>
        <div className="group-17">
          <div className="overlap-group-4">
            <div className="overlap-4">
              <div className="spinner-wrapper">{handleSpinnerLoading && <Spinner />}</div>
              <DoughnutChart chartData={topGainersData} />
              {/* <PieChart pieChartData={topGainersData} /> */}
            </div>
            <p className="text-wrapper-22">Previous investment memo trends</p>
          </div>
        </div>
        <div className="group-19">
          <div className="overlap-5">
            <div className="group-20">
              <div className="overlap-group-4">
                <div className="text-wrapper-22 text-wrapper-29">Market Cap - Healthcare sub sectors</div>
              </div>
            </div>
            <div className="group-21">
              <div className="overlap-6">
                <DoughnutChart chartData={subSectorsData} />
                {/* <PieChart pieChartData={subSectorsData} /> */}
              </div>
            </div>
          </div>
        </div>
        <div className="sideBar">
          <ChatBoxCustom
              handleAnalysisResponse={handleSummaryApiResponse}
              handleActionResponse={handleActionApiResponse}
              handleAPILoading={setIsMessageLoading}
              handleActionsLoading={setIsActionsLoading}
              selectedAction={selectedAction}
              setIsChatBotRequestStarted={setIsChatBotRequestStarted}
              setTopGainersData={setTopGainersData}
              setHandleSpinnerLoading={setHandleSpinnerLoading}
            />
        </div>
      </div>
      {/* <div className="group-35">
        <img className="group-36" alt="Group" src="https://c.animaapp.com/UugQg0T9/img/group-10-2.png" />
        <div className="overlap-9">
          <div className="group-37">
            <div className="overlap-group-6">
              <img className="ellipse-13" alt="Ellipse" src="https://c.animaapp.com/UugQg0T9/img/ellipse-1-2@2x.png" />
              <img className="ellipse-13" alt="Ellipse" src="https://c.animaapp.com/UugQg0T9/img/ellipse-1-2@2x.png" />
              <img className="ellipse-13" alt="Ellipse" src="https://c.animaapp.com/UugQg0T9/img/ellipse-1-2@2x.png" />
              <img className="ellipse-13" alt="Ellipse" src="https://c.animaapp.com/UugQg0T9/img/ellipse-1-2@2x.png" />
              <img className="ellipse-13" alt="Ellipse" src="https://c.animaapp.com/UugQg0T9/img/ellipse-1-2@2x.png" />
              <img className="ellipse-13" alt="Ellipse" src="https://c.animaapp.com/UugQg0T9/img/ellipse-1-2@2x.png" />
              <img className="ellipse-13" alt="Ellipse" src="https://c.animaapp.com/UugQg0T9/img/ellipse-1-2@2x.png" />
              <img className="ellipse-14" alt="Ellipse" src="https://c.animaapp.com/UugQg0T9/img/ellipse-1-2@2x.png" />
            </div>
          </div>
          <div className="rectangle-8" />
          <p className="div-2">
            <span className="text-wrapper-20">15%</span>
            <span className="text-wrapper-21">
              {" "}
              <br />
              Healthcare
            </span>
          </p>
          <div className="rectangle-9" />
          <p className="element-consumer-2">
            <span className="text-wrapper-20">15%</span>
            <span className="text-wrapper-21">
              {" "}
              <br />
              Consumer discretion...
            </span>
          </p>
          <div className="rectangle-10" />
          <div className="rectangle-11" />
          <p className="element-consumer-staples-2">
            <span className="text-wrapper-20">25%</span>
            <span className="text-wrapper-21">
              {" "}
              <br />
              Consumer Staples
            </span>
          </p>
          <p className="element-financials-2">
            <span className="text-wrapper-20">15%</span>
            <span className="text-wrapper-21">
              {" "}
              <br />
              Financials
            </span>
          </p>
        </div>
        <div className="text-wrapper-28">Sectors</div>
      </div> */}
    </div>
  );
};
