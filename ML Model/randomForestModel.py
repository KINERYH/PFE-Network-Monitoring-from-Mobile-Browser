from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
import seaborn as sns
import matplotlib.pyplot as plt


def random_forest_model(train_data, train_labels, val_data, val_labels, test_data, test_labels):
    # Define the Random Forest regressor model
    rf = RandomForestRegressor(n_estimators=100, random_state=42)

    # Train the model on the training data
    rf.fit(train_data, train_labels)

    # Use the trained model to make predictions on the validation and test data
    val_predictions = rf.predict(val_data)
    test_predictions = rf.predict(test_data)

    # Compute the mean squared error on the validation and test sets
    val_mse = mean_squared_error(val_labels, val_predictions, squared=False)
    test_mse = mean_squared_error(test_labels, test_predictions, squared=False)

    print("Validation set MSE: ", val_mse)
    print("Test set MSE: ", test_mse)

    return rf


def plot_heatmap_for_rfm(test_labels, test_predictions):
    fig, axes = plt.subplots(nrows=1, ncols=2, figsize=(12, 6))
    sns.histplot(x=test_labels[:, 0], y=test_predictions[:, 0], bins=50, cmap='coolwarm', cbar=True, ax=axes[0])
    sns.histplot(x=test_labels[:, 1], y=test_predictions[:, 1], bins=50, cmap='coolwarm', cbar=True, ax=axes[1])
    axes[0].set_title("Heatmap of Predicted vs. True Values (Downlink)")
    axes[0].set_xlabel("True Values")
    axes[0].set_ylabel("Predicted Values")
    axes[1].set_title("Heatmap of Predicted vs. True Values (RTT)")
    axes[1].set_xlabel("True Values")
    axes[1].set_ylabel("Predicted Values")
    plt.tight_layout()
    plt.show()
