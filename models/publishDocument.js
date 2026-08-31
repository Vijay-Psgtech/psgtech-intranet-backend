const mongoose = require('mongoose');

const publishDocumentSchema = new mongoose.Schema(
    {
        category: { type: String, enum: ['Administration', 'Academic', 'Autonomous', 'Regulations', 'COE', 'CBCS', 'Students Union'], required: true, trim: true },
        subtitle: { type: String, enum: ['Notice', 'Circular', 'Form', 'Guidelines', 'Event'], required: true },
        openingDate: { type: Date, required: true },
        closingDate: { type: Date },
        title: { type: String, required: true, trim: true, maxlength: 120 },
        url: { type: String, trim: true },
        file: { data: Buffer, contentType: String, originalName: String, size: Number },
        publishedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    },
    { timestamps: true },
);

publishDocumentSchema.pre('validate', function validateResource() {
    if (!this.url && !this.file?.data) {
        this.invalidate('resource', 'A URL or file is required.');
    }
    if (this.url && this.file?.data) {
        this.invalidate('resource', 'Provide either a URL or a file, not both.');
    }
    if (this.url && !/^https?:\/\//i.test(this.url)) {
        this.invalidate('url', 'URL must start with http:// or https://.');
    }
    if (this.closingDate && this.openingDate && this.closingDate < this.openingDate) {
        this.invalidate('closingDate', 'Closing date cannot be before opening date.');
    }
});

module.exports = mongoose.model("publishDocument", publishDocumentSchema);