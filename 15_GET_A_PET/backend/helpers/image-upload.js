const multer = require("multer");

const storage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
	if (file.mimetype.startsWith("image")) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

const imageUpload = multer({
	storage: storage,
	fileFilter: multerFilter,
	limits: { fileSize: 1048576 },
});

module.exports = { imageUpload };
