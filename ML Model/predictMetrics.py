import tensorflow as tf
import splittingAndNormalizingTrainingData as sntd
import dataUtils
import normalizingTestingData as ntd
import randomForestModel as rfm


def model_creation(train_data, train_labels, val_data, val_labels):
    model = tf.keras.Sequential()
    model.add(tf.keras.layers.Input(shape=(24, 1)))
    model.add(tf.keras.layers.Conv1D(400, 3, activation='relu'))
    model.add(tf.keras.layers.Conv1D(400, 3, activation='relu'))
    model.add(tf.keras.layers.MaxPooling1D(2))
    model.add(tf.keras.layers.Flatten())
    model.add(tf.keras.layers.Dense(100, activation='relu'))
    model.add(tf.keras.layers.Dense(2, activation='linear'))
    model.compile(optimizer='adam', loss='mse', metrics=['accuracy'])
    history = model.fit(train_data, train_labels, epochs=50, batch_size=128, validation_data=(val_data, val_labels))
    # model.save('model.h5')
    return model, history


if __name__ == "__main__":
    # Training
    measurements_file_path = "../TestData"
    training_data_file = "trainingData.txt"
    training_data_Preprocessed_file = "trainingDataPreprocessed.txt"
    labels_file = "labels.txt"

    train_data, train_labels, val_data, val_labels, test_data, test_labels = sntd.spit_and_normalize_data(
        measurements_file_path, training_data_Preprocessed_file, labels_file)

    train_data, train_labels, val_data, val_labels, test_data, test_labels = sntd.normalize_data(train_data,
                                                                                                 train_labels,
                                                                                                 val_data, val_labels,
                                                                                                 test_data, test_labels)
    model, history = model_creation(train_data, train_labels, val_data, val_labels)

    predictions = model.predict(test_data)

    dataUtils.plot_history(history)

    dataUtils.plot_prediction(test_labels, predictions)

    dataUtils.plot_heatmaps(test_labels, predictions)

    # Testing
    testing_measurements_file_path = "../TestData"
    testing_data_file = "mobileTestingData.txt"
    testing_data_Preprocessed_file = "mobileTestingDataPreprocessed.txt"
    testing_labels_file = "mobileTestingLabels.txt"

    testing_data, testing_labels = ntd.get_data(testing_measurements_file_path, testing_data_Preprocessed_file,
                                                testing_labels_file)

    testing_data, testing_labels = ntd.normalize_data(testing_data, testing_labels)

    testing_predictions = model.predict(testing_data)

    dataUtils.plot_prediction(testing_labels, testing_predictions)

    dataUtils.plot_heatmaps(testing_labels, testing_predictions)

    # Random Forest Model
    # Train
    rf = rfm.random_forest_model(train_data, train_labels, val_data, val_labels, test_data, test_labels)

    test_predictions = rf.predict(test_data)
    print("\nPC data Heatmaps")
    rfm.plot_heatmap_for_rfm(test_labels, test_predictions)

    # Test
    testing_predictions = rf.predict(testing_data)
    print("\nMobile data Heatmaps")
    rfm.plot_heatmap_for_rfm(testing_labels, testing_predictions)
