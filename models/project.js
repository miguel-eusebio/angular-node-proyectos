const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProjectSchema = Schema({
    name: String,
    description: String,
    category: String,
    year: Number,
    langs: String,
    image: String
});

// El nombre de la colección en la BD es projects, pero en este caso sera en singular 'Project'.
module.exports = mongoose.model('Project',  ProjectSchema);