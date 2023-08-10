const mongoose = require("../db/conn");
const { Schema } = require("mongoose");

const User = mongoose.model(
	"User",
	new Schema(
		{
			name: {
				type: String,
				required: true,
			},
			email: {
				type: String,
				required: true,
			},
			password: {
				type: String,
				required: true,
			},
			email: {
				type: String,
			},
			phone: {
				type: String,
				required: true,
			},
			image: {
				data: Buffer,
				contentType: String,
			},
		},
		{ timestamps: true }
	)
);

module.exports = User;
