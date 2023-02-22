import os
import numpy as np
from sklearn import preprocessing as pre

measurements_mobile_path = "../TestData/FromMobile"
testing_data_file = "testingData.txt"
testing_data_Preprocessed_file = "testingDataPreprocessed.txt"
labels_file = "testingDataLabels.txt"


def get_data(measurements_file_path, data_path, labels_path):
    testing_data = open(os.path.join(measurements_file_path, data_path), "r")
    training_data_lines = testing_data.readlines()
    test_data = [training_data_line.split(',') for training_data_line in training_data_lines]

    labels_data = open(os.path.join(measurements_file_path, labels_path), "r")
    labels_lines = labels_data.readlines()
    test_labels = [labels_data_line.strip().split(',') for labels_data_line in labels_lines[1:]]

    test_data = np.array(test_data, dtype=float)
    test_labels = np.array(test_labels, dtype=float)

    return test_data, test_labels


def normalize(input_data):
    current_shape = input_data.shape
    x = input_data.reshape(-1, 1)
    x_norm = pre.MinMaxScaler().fit_transform(x)
    return x_norm.reshape(current_shape)


def normalize_data(test_data, test_labels):
    test_data_normalized = normalize(test_data)
    # test_labels_normalized = normalize(test_labels)
    return test_data_normalized, test_labels
