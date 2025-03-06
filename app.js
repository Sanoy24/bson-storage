const { BSON } = require("bson");
const fs = require("fs-extra");
const transaction = require("./data.json");
const path = require("node:path");

const filePath = path.join(__dirname, "./data.bson");

/**
 * Serializes transaction data to a BSON file.
 *
 * @param {object} trx - The transaction object to serialize.
 * @returns {Promise<void>} - A promise that resolves when the data is written to the file.
 * @throws {Error} - Throws an error if file writing fails.
 */
async function serializeData(trx) {
  try {
    const data = BSON.serialize(trx);
    await fs.writeFile(filePath, data);
  } catch (error) {
    console.error("Error serializing data:", error);
    throw error; // Re-throw the error to be handled by the caller, if needed.
  }
}

/**
 * Reads and deserializes transaction data from a BSON file and retrieves a specific transaction by ID.
 *
 * @param {string} id - The transaction ID (ft_number) to search for.
 * @returns {object|string|null} - The found transaction object, a string indicating file absence, or null if not found.
 * @throws {Error} - Throws an error if file reading or deserialization fails.
 */
async function readData(id) {
  if (!fs.existsSync(filePath)) {
    return "BSON file does not exist.";
  }

  try {
    const bsonData = await fs.readFile(filePath);
    const data = BSON.deserialize(bsonData);

    if (!data || !data.transactions || !Array.isArray(data.transactions)) {
      console.error("Invalid BSON data structure.");
      return null;
    }

    const singleTransaction = data.transactions.find(
      (transaction) => transaction.ft_number === id
    );

    if (singleTransaction) {
      return singleTransaction;
    } else {
      console.log(`Transaction with ID ${id} not found.`);
      return null;
    }
  } catch (error) {
    console.error("Error reading or deserializing data:", error);
    throw error; // Re-throw the error to be handled by the caller, if needed.
  }
}

// Example usage with async/await, which is generally better for readability and error handling with promises.
async function main() {
  try {
    await serializeData(transaction);
    const result = await readData("TXN3344556677");
    console.log(result);
  } catch (error) {
    console.error("An error occurred in the main process:", error);
  }
}

main();
