# BSON Data Serializer/Deserializer

This Node.js script serializes data from a JSON file (`data.json`) into a BSON file (`data.bson`) and provides functionality to read and retrieve specific data by their ID.

## Prerequisites

- Node.js installed
- `bson` and `fs-extra` npm packages installed.

## Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/Sanoy24/bson-storage.git
    ```

2.  Install dependencies:

    ```bash
    npm install bson fs-extra
    ```

## Usage

1. ```bash
   cd bson-storage
   ```
2. Place your data in `data.json`.
3. Run the script:

   ```bash
   node app.js
   ```

   - This will create `data.bson`.
   - The script will also attempt to read and print a data with the given id.
