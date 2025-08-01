const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    image: {
        type: String,
        default: 'https://images.unsplash.com/photo-1461988320302-91bde64fc8e4?ixid=2yJhcHBfaWQiOjEyMDd9'
    },
    tags: {
        type: [String],
        default: []
    }
})

module.exports = mongoose.model('Experience', experienceSchema);