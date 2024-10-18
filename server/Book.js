const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: true
    },
    authorName: {
        type: String,
        required: true
    },
    year_of_publication: {
        type: Number,  // changed to Number
        required: true
    },
    price: {
        type: Number,  // changed to Number
        required: true
    },
    discount: {
        type: Number,  // changed to Number
        required: false  // made optional
    },
    number_of_pages: {
        type: Number,  // changed to Number
        required: true
    },
    condition: {
        type: String,
        enum: ["new", "used"],
        required: true
    },
    description: {
        type: String,
        required: false  // made optional
    }
});

module.exports = mongoose.model('Book', BookSchema);
