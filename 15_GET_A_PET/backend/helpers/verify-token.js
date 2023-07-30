const jwt = require("jsonwebtoken");
const getToken = require("./get-token");

const verifyToken = (req, res, next) => {
	const token = getToken(req);

	try {
		const verified = jwt.verify(token, "secret");
		req.user = verified;
		next();
	} catch (error) {
		console.error("Error: " + error);
		res.status(401).json({ message: "Acesso negado!" });
		return;
	}
};

module.exports = verifyToken;
