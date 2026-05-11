// import fs from 'fs';
let fs = require("fs")
let path = require('path');
let mongoose = require('mongoose');
// import pdfParse from 'pdf-parse';
const pdfParse = require('pdf-parse');

// MongoDB connection
mongoose.connect('mongodb+srv://jamessteppingstone_db_user:eIKxg3RIloV8T2xM@cluster0.kamyprc.mongodb.net/?appName=Cluster0', {
    // useNewUrlParser: true, // optional now in modern Mongoose
    // useUnifiedTopology: true, // optional
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

const questionSchema = new mongoose.Schema({
    questionText: String,
    occurrenceYear: Number,
    occurrenceCount: Number,
});

const Question = mongoose.model('Question', questionSchema);

// PDF folder path
const pdfFolder = './pdfs'; // Replace with your actual folder path

// Process each PDF file
fs.readdir(pdfFolder, (err, files) => {
    if (err) {
        console.error('Folder read error:', err);
        return;
    }

    files.forEach((file) => {
        if (path.extname(file) === '.pdf') {
            const filePath = path.join(pdfFolder, file);
            const dataBuffer = fs.readFileSync(filePath);

            pdfParse(dataBuffer).then((data) => {
                const text = data.text;

                // Regex to find questions like Q1., Q2., etc.
                const questionRegex = /Q\d+\./g;
                const matches = text.match(questionRegex);

                if (matches) {
                    matches.forEach((question, index) => {
                        // Extract the question text (next line after the match)
                        const afterQ = text.split(question)[1]; // Get the text after the question
                        const questionText = question + ' ' + afterQ.split('\n')[0]; // First line after Q

                        const newQuestion = new Question({
                            questionText: questionText.trim(),
                            occurrenceYear: new Date().getFullYear(), // You can customize year if needed
                            occurrenceCount: 1,
                        });

                        newQuestion.save((saveErr) => {
                            if (saveErr) {
                                console.error('Error saving question:', saveErr);
                            } else {
                                console.log('Question saved:', questionText);
                            }
                        });
                    });
                }
            }).catch((err) => {
                console.error('PDF parsing error:', err);
            });
        }
    });
});