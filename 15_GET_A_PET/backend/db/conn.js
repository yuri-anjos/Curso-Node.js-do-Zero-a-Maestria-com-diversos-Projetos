const mongoose = require("mongoose");

async function main() {
	await mongoose.connect("mongodb://127.0.0.1:27017/15_get_a_pet");
	console.info("Conectou ao Mongoose!");
}

main().catch((err) => console.error("Error: " + err));

module.exports = mongoose;
