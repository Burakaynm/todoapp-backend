const toDoModel = require('../models/ToDoModel');
const path = require('path');

// Get to-dos with pagination
module.exports.getToDo = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;  // Pagination parameters
        const toDos = await toDoModel.find({ userId: req.user._id })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        const count = await toDoModel.countDocuments({ userId: req.user._id });
        res.send({
            toDos,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
};

// Save a new to-do with optional thumbnail and file
module.exports.saveToDo = async (req, res) => {
    try {
        const { text, tags } = req.body;
        const thumbnail = req.files['thumbnail'] ? `/uploads/${req.files['thumbnail'][0].filename}` : null;
        const file = req.files['file'] ? `/uploads/${req.files['file'][0].filename}` : null;
        const newToDo = await toDoModel.create({ userId: req.user._id, text, tags: tags.split(','), thumbnail, file });
        console.log('Added successfully..');
        res.send(newToDo);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
};

// Update an existing to-do
module.exports.updateToDo = async (req, res) => {
    try {
        const { _id, text, tags } = req.body;
        const thumbnail = req.files['thumbnail'] ? `/uploads/${req.files['thumbnail'][0].filename}` : null;
        const file = req.files['file'] ? `/uploads/${req.files['file'][0].filename}` : null;
        await toDoModel.findOneAndUpdate(
            { _id, userId: req.user._id },
            { text, tags: tags.split(','), thumbnail, file },
            { new: true }
        );
        res.status(201).send('Updated Successfully..');
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
};

// Search to-dos by text or tag with pagination
module.exports.searchToDo = async (req, res) => {
    try {
        const { query, tag, page = 1, limit = 10 } = req.query; // to-do number for each page when searching
        const searchCriteria = { userId: req.user._id };

        if (query) {
            searchCriteria.text = { $regex: query, $options: 'i' };
        }

        if (tag) {
            searchCriteria.tags = tag;
        }

        const toDos = await toDoModel.find(searchCriteria)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        const count = await toDoModel.countDocuments(searchCriteria);

        res.send({
            toDos,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
};

// Download a file associated with a to-do
module.exports.downloadFile = async (req, res) => {
    try {
        const filePath = path.join(__dirname, '../uploads', req.params.filename);
        res.download(filePath, (err) => {
            if (err) {
                console.error(err);
                res.status(500).send({ message: "Internal Server Error" });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
};

// Delete an existing to-do
module.exports.deleteToDo = async (req, res) => {
    try {
        const { _id } = req.body;
        await toDoModel.findOneAndDelete({ _id, userId: req.user._id });
        res.status(201).send('Deleted Successfully..');
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}

// Check a completed to-do
module.exports.toggleComplete = async (req, res) => {
    try {
        const { _id } = req.body;
        const toDo = await toDoModel.findOne({ _id, userId: req.user._id });

        if (!toDo) {
            return res.status(404).send({ message: "ToDo not found" });
        }

        toDo.completed = !toDo.completed;
        await toDo.save();

        res.status(200).send('ToDo status updated successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
};

