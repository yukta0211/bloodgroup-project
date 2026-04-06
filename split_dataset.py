import os
import shutil
import random

# Source folder (your current processed data)
SOURCE_DIR = "processed"

# Destination folder (new structure you created)
DEST_DIR = "dataset"

# Split ratios
TRAIN_RATIO = 0.7
VAL_RATIO = 0.15
TEST_RATIO = 0.15

# Loop through each class folder
for class_name in os.listdir(SOURCE_DIR):
    class_path = os.path.join(SOURCE_DIR, class_name)

    if not os.path.isdir(class_path):
        continue

    files = os.listdir(class_path)
    random.shuffle(files)

    total = len(files)
    train_end = int(TRAIN_RATIO * total)
    val_end = train_end + int(VAL_RATIO * total)

    print(f"Processing class: {class_name} ({total} images)")

    for i, file in enumerate(files):
        src_path = os.path.join(class_path, file)

        # Decide destination
        if i < train_end:
            dest_path = os.path.join(DEST_DIR, "train", class_name, file)
        elif i < val_end:
            dest_path = os.path.join(DEST_DIR, "val", class_name, file)
        else:
            dest_path = os.path.join(DEST_DIR, "test", class_name, file)

        # Move file
        shutil.copy(src_path, dest_path)

print("\n Dataset split completed successfully!")