import cv2
import numpy as np

# Label mapping (same as your training)
CLASS_NAMES = ['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-']

def preprocess_image(img):
    # convert to grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # resize to model input
    gray = cv2.resize(gray, (128, 128))

    # improve contrast
    gray = cv2.equalizeHist(gray)

    # convert to ridge-like image
    thresh = cv2.adaptiveThreshold(
        gray,
        255,
        cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv2.THRESH_BINARY,
        11,
        2
    )

    # normalize
    img = thresh / 255.0
    img = np.reshape(img, (1, 128, 128, 1))

    return img, thresh


def get_prediction_label(pred):
    index = np.argmax(pred)
    return CLASS_NAMES[index]