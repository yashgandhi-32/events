const Event = require('../models/Event');
var moment = require('moment')

exports.addNewEvent = async (req, res) => {
    if (req.file != null) {
        console.log(req.file)
        req.body.eventImage = '/uploads/' + req.file.filename
    } else {
        req.body.eventImage = '/uploads/samepleimage'
    }
    req.body.date = new Date("<YYYY-mm-dd>");
    const event = new Event(req.body)
    const newEvent = await event.save()
    res.json({ error: false, errors: [], data: newEvent });
}
exports.updateEvent = async (req, res) => {
    if (req.file != null) {
        console.log(req.file)
        req.body.eventImage = '/uploads/' + req.file.filename
    } else {
        req.body.eventImage = '/uploads/samepleimage'
    }
    if (req.body.comments) {
        delete req.body.comments;
    }
    req.body.publishedOn = Date.now()
    const updatedResult = await Event.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).exec(function (err, updatedResult) {
        if (updatedResult) res.json({ error: false, errors: [], data: updatedResult });
        else res.json({ error: false, errors: [{ params: "event", msg: err.message }], data: [] });
    })
}
exports.getEventsList = async (req, res) => {
    const eventsList = await Event.getEventsList();
    res.json({ error: false, errors: [], data: eventsList });
};

exports.validateEventDetails = function (req, res, next) {
    req.checkBody("eventName", "Must add event name.").notEmpty();
    req.checkBody("place", "Ohhh!! you forgot to tell where to come").notEmpty();
    //req.checkBody("date", "Ohh!! pls add date").notEmpty();
    req.checkBody("location.address", "Address cant be empty").notEmpty()
    req.checkBody("location.coordinates", "Please enter proper coordinates").notEmpty()
    req.getValidationResult()
        .then((result) => {
            if (!result.isEmpty()) {
                return res.status(400).json({
                    error: true,
                    errors: result.array(),
                    data: []
                });
            }
            next();
        });
}
exports.deleteEvent = async (req, res) => {
    const userData = await Event.findOneAndRemove({ _id: req.params.id })
    res.json({ error: false, errors: [], data: userData });
}

exports.getEventByDate = function (req, res) {
    Event.aggregate([
        {
            $group: {
                _id: "$likes",
                data: {
                    $push: {
                        date: "$date",
                        eventName: "$eventName",
                        time: "$time",
                        location: "$location",
                        publishedBy: "$publishedBy",
                        published: "$published",
                        tags: "$tags",
                        eventImage: "$eventImage",
                        publishedOn: "$publishedOn",
                        contact: "$contact",
                        likes: "$likes",
                        comments: "$comments"
                    }
                }
            }
        }, { $sort: { "_id": -1 } }])
        .exec((err, data) => {
            if (data) res.json({ error: false, errors: [], data: data });
            else res.json("erro")
        })
}