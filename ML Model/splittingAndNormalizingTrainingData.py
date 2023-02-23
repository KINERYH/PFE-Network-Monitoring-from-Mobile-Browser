import os
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn import preprocessing as pre

measurements_pc_path = "../TestData"
training_data_file = "trainingData.txt"
training_data_Preprocessed_file = "trainingDataPreprocessed.txt"
labels_file = "labels.txt"


def spit_and_normalize_data(measurements_file_path, data_path, labels_path):
    training_data = open(os.path.join(measurements_file_path, data_path), "r")
    training_data_lines = training_data.readlines()
    data = [training_data_line.split(',') for training_data_line in training_data_lines]

    labels_data = open(os.path.join(measurements_file_path, labels_path), "r")
    labels_lines = labels_data.readlines()
    labels = [labels_data_line.strip().split(',') for labels_data_line in labels_lines]

    # Split the data into training and test sets
    train_data, test_data, train_labels, test_labels = train_test_split(data, labels[1:], test_size=0.2,
                                                                        stratify=labels[1:])

    # Split the training set further into training and validation sets
    train_data, val_data, train_labels, val_labels = train_test_split(train_data, train_labels, test_size=0.2,
                                                                      stratify=train_labels)

    train_data = np.array(train_data, dtype=float)
    train_labels = np.array(train_labels, dtype=float)
    val_data = np.array(val_data, dtype=float)
    val_labels = np.array(val_labels, dtype=float)
    test_data = np.array(test_data, dtype=float)
    test_labels = np.array(test_labels, dtype=float)

    return train_data, train_labels, val_data, val_labels, test_data, test_labels


def normalize(input_data):
    current_shape = input_data.shape
    x = input_data.reshape(-1, 1)
    x_norm = pre.MinMaxScaler().fit_transform(x)
    return x_norm.reshape(current_shape)


def normalize_data(train_data, train_labels, val_data, val_labels, test_data, test_labels):
    train_data_normalized = normalize(train_data)
    # train_labels_normalized = normalize(train_labels)
    val_data_normalized = normalize(val_data)
    # val_labels_normalized = normalize(val_labels)
    test_data_normalized = normalize(test_data)
    # test_labels_normalized = normalize(test_labels)
    return train_data_normalized, train_labels, val_data_normalized, val_labels, test_data_normalized, test_labels
