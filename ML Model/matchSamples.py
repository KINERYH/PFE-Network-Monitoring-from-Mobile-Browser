import os
from datetime import datetime, timedelta
import pandas as pd


# Function one-time use when we obtain a new ACQUA's dataset (UTC -> UTC+1)
def convertTime(path):
    # import the .csv file in a dataframe
    df = pd.read_csv(path, sep=";")
    timeList = df['DATE'].tolist()
    # increment of 1 hour the time (GMT+1, our local time)
    for i in range(len(timeList)):
        time = datetime.strptime(timeList[i], "%Y-%m-%d %H:%M:%S.%f")
        time = time + timedelta(hours=1)
        timeList[i] = time.strftime("%Y-%m-%d %H:%M:%S.%f")

    df['DATE'] = timeList

    df.to_csv(path, index=False, sep=";")


def matchSamples(recordPath, acquaPath):
    # the name of the file is the related ACQUA's id of the measurements
    filename = recordPath.split("\\")[-1]
    userId = os.path.splitext(filename)[0]

    acquaDf = pd.read_csv(acquaPath, sep=";")
    keyDf = acquaDf[acquaDf['USER_ID'] == userId]
    keyDf = keyDf[["USER_ID", "DATE", "RTT", "UDP_DOWNLOAD_THROUGHPUT"]]

    acquaTimeList = []
    acquaTimeListTemp = keyDf['DATE'].tolist()
    UDP_Download_Throughput_List = keyDf['UDP_DOWNLOAD_THROUGHPUT'].tolist()

    for i in range(len(acquaTimeListTemp)):
        if UDP_Download_Throughput_List[i] > 0:
            acquaTimeList.append(datetime.strptime(acquaTimeListTemp[i], "%Y-%m-%d %H:%M:%S.%f"))

    recordDf = pd.read_csv(recordPath)
    recordTimeList = recordDf['date'].tolist()
    # convert the string into a good time format
    for i in range(len(recordTimeList)):
        # every time instance is saved with the relevant information in the first 24 characters
        timeStr = recordTimeList[i][:24]
        # I suppose that the day is saved as a zero-padded decimal (01, 02, ..., 31) => %d flag
        # otherwise I should use the %-d flag (and I should also adjust the number of chars
        # taken by the recordTimeList[i])
        recordTimeList[i] = datetime.strptime(timeStr, "%a %b %d %Y %H:%M:%S")

    outputDf = pd.DataFrame(columns=["downlink", 'rtt'])
    rtt = pd.Series([], dtype=pd.StringDtype())
    downlink = pd.Series([], dtype=pd.StringDtype())
    # match the samples
    for time in recordTimeList:
        closestTime = min(acquaTimeList, key=lambda x: abs(x - time))
        # check if the closest time is less than 2 minutes away from the time of the record
        if abs(closestTime - time) < timedelta(seconds=120):
            closestTime = closestTime.strftime("%Y-%m-%d %H:%M:%S.%f")
            row = keyDf[keyDf['DATE'] == closestTime]
            rtt = row['RTT']
            downlink = row['UDP_DOWNLOAD_THROUGHPUT']
        if not rtt.empty and not downlink.empty:
            new_row = pd.DataFrame(
                {"downlink": ["{:.2f}".format(downlink.values[0] / (10 ** 6))],
                 "rtt": ["{:.2f}".format(rtt.values[0] / (10 ** 6))]})
            outputDf = pd.concat([outputDf, new_row], ignore_index=True)

    outputDf = outputDf.reset_index(drop=True)
    # GT = Ground Truth
    outputDf.to_csv(userId + "_GT.csv", sep=",", index=False)

    # newDF.to_csv("prova.csv", index=False, sep=";")


matchSamples("a0abf7f8-6d92-48d5-8ec3-2ee4488c358c.txt", "measurements_full.csv")
# convertTime("measurements_full.csv")
