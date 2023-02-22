import numpy as np
import matplotlib.pyplot as plt


def plot_history(history):
    plt.figure()
    plt.xlabel('Epoch')
    plt.ylabel('Mean Abs Error')
    plt.title("Train and validation error")
    plt.plot(history.epoch, np.array(history.history['loss']), label='Train')
    plt.plot(history.epoch, np.array(history.history['val_loss']), label='Val')
    plt.legend()
    plt.ylim([min(history.history['val_loss']) - 15, max(history.history['val_loss']) + 1])


def plot_prediction(test_labels, test_predictions):
    fig, axs = plt.subplots(1, 2, figsize=(10, 4))
    # Plot for column 1
    axs[0].scatter(test_labels[:, 0], test_predictions[:, 0], color='red', label='Column 1')
    axs[0].set_xlabel('True Values')
    axs[0].set_ylabel('Predictions')
    axs[0].set_title('Downlink')
    axs[0].legend()
    # Plot for column 2
    axs[1].scatter(test_labels[:, 1], test_predictions[:, 1], color='blue', label='Column 2')
    axs[1].set_xlabel('True Values')
    axs[1].set_ylabel('Predictions')
    axs[1].set_title('RTT')
    axs[1].legend()
    # Adjust spacing between subplots
    fig.tight_layout()
    plt.show()

    fig, axs = plt.subplots(nrows=1, ncols=2, figsize=(10, 5))
    colors = ['red', 'blue']
    for i in range(2):
        error = np.abs(test_predictions[:, i] - test_labels[:, i])
        axs[i].hist(error, color=colors[i])
        axs[i].set_xlabel(f"Prediction Error (column {i + 1})")
        axs[i].set_ylabel("Count")
    fig.tight_layout()


def plot_heatmaps(test_labels, predictions):
    fig, axs = plt.subplots(1, 2, figsize=(10, 4))
    # Plot for column 1
    im1 = axs[0].hist2d(test_labels[:, 0], predictions[:, 0], bins=10, cmap='coolwarm')
    axs[0].set_xlabel('True Values')
    axs[0].set_ylabel('Predictions')
    axs[0].set_title("Heatmap of Predicted vs. True Values (Downlink)")
    fig.colorbar(im1[3], ax=axs[0])
    # Plot for column 2
    im2 = axs[1].hist2d(test_labels[:, 1], predictions[:, 1], bins=10, cmap='coolwarm')
    axs[1].set_xlabel('True Values')
    axs[1].set_ylabel('Predictions')
    axs[1].set_title("Heatmap of Predicted vs. True Values (RTT)")
    fig.colorbar(im2[3], ax=axs[1])
    # Adjust spacing between subplots
    fig.tight_layout()
    plt.show()
