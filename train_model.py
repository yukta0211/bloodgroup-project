import tensorflow as tf
import cv2
import numpy as np
from tensorflow.keras.preprocessing.image import ImageDataGenerator

# -------------------------------
# SETTINGS
# -------------------------------
IMG_SIZE = 128
BATCH_SIZE = 32

# -------------------------------
# PREPROCESSING FUNCTION
# (MUST MATCH utils.py)
# -------------------------------
def preprocess_train(img):
    img = img.astype('uint8')

    # Ensure grayscale
    if len(img.shape) == 3:
        gray = img[:, :, 0]
    else:
        gray = img

    # Resize
    gray = cv2.resize(gray, (IMG_SIZE, IMG_SIZE))

    # Enhance contrast
    gray = cv2.equalizeHist(gray)

    # Adaptive threshold
    thresh = cv2.adaptiveThreshold(
        gray,
        255,
        cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv2.THRESH_BINARY,
        11,
        2
    )

    # Normalize
    thresh = thresh / 255.0

    # Add channel dimension
    thresh = np.expand_dims(thresh, axis=-1)

    return thresh

# -------------------------------
# DATA GENERATORS
# -------------------------------
train_datagen = ImageDataGenerator(
    preprocessing_function=preprocess_train,
    rotation_range=10,
    zoom_range=0.1,
    width_shift_range=0.1,
    height_shift_range=0.1
)

val_datagen = ImageDataGenerator(
    preprocessing_function=preprocess_train
)

test_datagen = ImageDataGenerator(
    preprocessing_function=preprocess_train
)

# -------------------------------
# LOAD DATA FROM NEW STRUCTURE
# -------------------------------
train = train_datagen.flow_from_directory(
    "dataset/train",
    target_size=(IMG_SIZE, IMG_SIZE),
    color_mode="grayscale",
    batch_size=BATCH_SIZE,
    class_mode="categorical"
)

val = val_datagen.flow_from_directory(
    "dataset/val",
    target_size=(IMG_SIZE, IMG_SIZE),
    color_mode="grayscale",
    batch_size=BATCH_SIZE,
    class_mode="categorical"
)

test = test_datagen.flow_from_directory(
    "dataset/test",
    target_size=(IMG_SIZE, IMG_SIZE),
    color_mode="grayscale",
    batch_size=BATCH_SIZE,
    class_mode="categorical",
    shuffle=False
)

# -------------------------------
# CLASS MAPPING (VERY IMPORTANT)
# -------------------------------
print("Class mapping:", train.class_indices)

# Alphabetical order based on folder names
CLASS_NAMES = ['A-', 'A+', 'AB-', 'AB+', 'B-', 'B+', 'O-', 'O+']

# -------------------------------
# MODEL (IMPROVED CNN)
# -------------------------------
model = tf.keras.models.Sequential([

    tf.keras.layers.Conv2D(32, (3,3), activation="relu", input_shape=(128,128,1)),
    tf.keras.layers.BatchNormalization(),
    tf.keras.layers.MaxPooling2D(2,2),

    tf.keras.layers.Conv2D(64, (3,3), activation="relu"),
    tf.keras.layers.BatchNormalization(),
    tf.keras.layers.MaxPooling2D(2,2),

    tf.keras.layers.Conv2D(128, (3,3), activation="relu"),
    tf.keras.layers.BatchNormalization(),
    tf.keras.layers.MaxPooling2D(2,2),

    tf.keras.layers.Conv2D(256, (3,3), activation="relu"),
    tf.keras.layers.MaxPooling2D(2,2),

    tf.keras.layers.Flatten(),

    tf.keras.layers.Dense(256, activation="relu"),
    tf.keras.layers.Dropout(0.5),

    tf.keras.layers.Dense(8, activation="softmax")
])

# -------------------------------
# COMPILE
# -------------------------------
model.compile(
    optimizer="adam",
    loss="categorical_crossentropy",
    metrics=["accuracy"]
)

# -------------------------------
# CALLBACKS
# -------------------------------
early_stop = tf.keras.callbacks.EarlyStopping(
    monitor='val_loss',
    patience=5,
    restore_best_weights=True
)

reduce_lr = tf.keras.callbacks.ReduceLROnPlateau(
    monitor='val_loss',
    factor=0.3,
    patience=3,
    min_lr=1e-5
)

# -------------------------------
# TRAIN MODEL
# -------------------------------
history = model.fit(
    train,
    epochs=30,
    validation_data=val,
    callbacks=[early_stop, reduce_lr]
)

# -------------------------------
# TEST EVALUATION (NEW 🔥)
# -------------------------------
loss, acc = model.evaluate(test)
print(f"\n Test Accuracy: {acc*100:.2f}%")

# -------------------------------
# SAVE MODEL
# -------------------------------
model.save("blood_model.h5")

print("Model training complete and saved!")