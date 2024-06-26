const multer = require('multer');
const storage = multer.diskStorage({
	destination(req, file, callback) {
		callback(null, process.cwd() + "/upload");
	},

	filename(req, file, callback) {
		callback(null, Date.now() + "-" + file.originalname);
	},
});

const upload = multer({ storage: storage });

module.exports = {upload};