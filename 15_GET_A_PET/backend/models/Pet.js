const mongoose = require("../db/conn");
const { Schema } = require("mongoose");

const Pet = mongoose.model(
	"Pet",
	new Schema(
		{
			name: {
				type: String,
				required: true,
			},
			age: {
				type: Number,
				required: true,
			},
			weigth: {
				type: Number,
				required: true,
			},
			color: {
				type: String,
				required: true,
			},
			images: [
				{
					data: Buffer,
					contentType: String,
				},
			],
			available: {
				type: Boolean,
				required: true,
			},
			refused: { type: [Schema.Types.ObjectId] },
			user: Object,
			adopter: Object,
		},
		{ timestamps: true }
	)
);

module.exports = Pet;
