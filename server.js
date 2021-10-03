const express = require("express");
const path = require('path');
const mongoose = require("mongoose");

const app = express();

// Mongoose
mongoose.Promise = global.Promise;
mongoose.connect("process.env.mongodbURI", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(() => console.log('mongodb connected'))
    .catch(err => console.log(err));

app.use(express.static(__dirname + '/public'));

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// models ===============================================
const { Mark } = require("./models/mark");

app.get("/", (req, res) => {
    res.sendFile('/index.html');
})
app.get("/form", (req, res) => {
    res.sendFile('./public/form.html', {root: __dirname});
})
app.get("/search", (req, res) => {
    res.sendFile('./public/search.html', { root: __dirname });
})

app.post("/api/addmark", (req, res) => {
    Mark.findOne(
        { "usn": req.body.usn, "sem": req.body.sem, "branch": req.body.branch},
        (err, mark) => {
            if (mark) {
                mark.percentage = req.body.percentage;
                mark.cgpa = req.body.cgpa;
                mark.sgpa = req.body.sgpa;
                mark.usn = req.body.usn;
                mark.subject = req.body.subject;
                mark.sem = req.body.sem;
                mark.branch = req.body.branch;

                mark.save(function (err, doc) {
                    if (err) return res.json({ success: false, err });

                    res.status(200).json({
                        success: true
                    })
                })
            } else {
                const newMark = new Mark({
                    percentage: req.body.percentage,
                    cgpa: req.body.cgpa,
                    sgpa: req.body.sgpa,
                    usn: req.body.usn,
                    subject: req.body.subject,
                    sem: req.body.sem,
                    branch: req.body.branch
                });

                newMark.save((err, doc) => {
                    if (err) return res.json({ success: false, err });

                    res.status(200).json({
                        success: true
                    })
                })
            }
        }
    )
})

app.get("/api/mark", (req, res) => {
    Mark.find({ usn: req.query.usn }).exec((err, marks) => {
        res.status(200).json({
            marks
        })
    })
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("port listening on port " + port)
})