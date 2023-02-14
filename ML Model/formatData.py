import csv
from datetime import datetime


def check_time_equality(date1, date2):
    # First, we convert both time strings to datetime objects
    date1 = datetime.strptime(date1, "%a %b %d %Y %H:%M:%S %Z%z")
    date2 = datetime.strptime(date2, "%Y-%m-%d %H:%M:%S.%f")

    # Then, we compare the minute part of the datetime objects
    return date1.year == date2.year \
           and date1.month == date2.month \
           and date1.day == date2.day \
           and date1.hour == date2.hour \
           and date1.minute == date2.minute


def parse_data(metrics_file_path, ground_truth_file_parth):
    ground_truth_data = []
    collected_data = []
    with open(ground_truth_file_parth, 'r') as file:
        reader = csv.reader(file)
        ground_truth_rows = [item[0].split(';') for item in reader]

    with open(metrics_file_path, 'r') as file:
        content = file.read()
        collected_data_rows = [item.split(',') for item in content.split(";\n")[:-1]]

    for collected_data_row in collected_data_rows[1:]:
        for ground_truth_row in ground_truth_rows[1:]:
            collected_data_row_time = collected_data_row[-2].split(" (")[0]
            if check_time_equality(collected_data_row_time, ground_truth_row[1]):
                collected_data.append(collected_data_row[:-2])
                ground_truth_data.append([ground_truth_row[2], ground_truth_row[7]])  # RTT, UDP_Download_Throughput

    return collected_data, ground_truth_data
