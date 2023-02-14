import tensorflow as tf
from sklearn.model_selection import train_test_split
from formatData import parse_data

metrics_file_path = "C:/Users/Yaacoub/Downloads/testData/testRecord.txt"
ground_truth_file_parth = "./GroundTruthData/measurements_full.csv"

# Load the data and labels
data, labels = parse_data(metrics_file_path, ground_truth_file_parth)  # a numpy array with the data and the labels

# Split the data into training and test sets
train_data, test_data, train_labels, test_labels = train_test_split(data, labels, test_size=0.2, stratify=labels)

# Split the training set further into training and validation sets
train_data, val_data, train_labels, val_labels = train_test_split(train_data, train_labels, test_size=0.2,
                                                                  stratify=train_labels)

# Define the model
model = tf.keras.Sequential()

# Add the first 1D CNN layer
model.add(tf.keras.layers.Conv1D(100, 3, activation='relu', input_shape=(len(train_data), 21)))

# Add the second 1D CNN layer
model.add(tf.keras.layers.Conv1D(100, 3, activation='relu'))

# Add the max pooling layer
model.add(tf.keras.layers.MaxPooling1D(2))

# Flatten the output from the max pooling layer
model.add(tf.keras.layers.Flatten())

# Add the fully connected layer
model.add(tf.keras.layers.Dense(100, activation='relu'))
model.add(tf.keras.layers.Dense(2, activation='linear'))

# Compile the model
model.compile(optimizer='adam', loss='mean_squared_error', metrics=['accuracy'])

# Train the model
history = model.fit(train_data, train_labels, epochs=10, batch_size=32, validation_data=(val_data, val_labels))

# Make predictions on the test data
predictions = model.predict(test_data)

model.save('model.h5')
