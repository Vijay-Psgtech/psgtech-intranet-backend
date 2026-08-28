const PublishDocument = require('../models/publishDocument');

exports.createDocument = async (req, res) => {
  try {
    const { category, subtitle, openingDate, closingDate, title, url } = req.body;
    const document = await PublishDocument.create({
      category, subtitle, openingDate, closingDate: closingDate || undefined, title, url: url || undefined,
      file: req.file ? { data: req.file.buffer, contentType: req.file.mimetype, originalName: req.file.originalname, size: req.file.size } : undefined,
      publishedBy: req.user.id,
    });
    return res.status(201).json({ message: 'Resource published successfully.', document: { id: document._id, title: document.title, category: document.category, resourceUrl: document.url || `/api/documents/${document._id}/file`, createdAt: document.createdAt } });
  } catch (error) {
    if (error.name === 'ValidationError') return res.status(400).json({ message: Object.values(error.errors).map(({ message }) => message).join(' ') });
    console.error(error);
    return res.status(500).json({ message: 'Failed to publish resource.' });
  }
};

exports.getDocumentFile = async (req, res) => {
  try {
    const document = await PublishDocument.findById(req.params.id).select('file');
    if (!document?.file?.data) return res.status(404).json({ message: 'File not found.' });
    res.type(document.file.contentType).send(document.file.data);
  } catch {
    res.status(404).json({ message: 'File not found.' });
  }
};