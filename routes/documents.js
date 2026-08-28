const express = require('express');
const multer = require('multer');
const auth = require('../middleware/auth');
const { createDocument, getDocumentFile } = require('../controllers/documentController');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });
const uploadResource = (req, res, next) => upload.single('file')(req, res, (error) => {
	if (error instanceof multer.MulterError && error.code === 'LIMIT_FILE_SIZE') {
		return res.status(400).json({ message: 'The resource file must be 10 MB or smaller.' });
	}
	if (error) return res.status(400).json({ message: 'Unable to read the uploaded file.' });
	next();
});

router.post('/', auth, uploadResource, createDocument);
router.get('/:id/file', getDocumentFile);

module.exports = router;