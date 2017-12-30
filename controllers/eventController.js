const Event = require('../models/Event');

exports.addNewEvent = async (req, res) => {
    if (req.file != null) {
        console.log(req.file)
        req.body.eventImage = '/uploads/' + req.file.filename
    }else{
        req.body.eventImage = '/uploads/samepleimage'
    }
    const event = new Event(req.body)
    const newEvent = await event.save()
    res.json({ error: false, errors: [], data: newEvent });
}

exports.getEventsList = async (req, res) => {
    const eventsList = await Event.getEventsList();
    res.json({ error: false, errors: [], data: eventsList });
};

exports.validateEventDetails = function (req, res, next) {
    req.checkBody("eventName", "Must add event name.").notEmpty();
    req.checkBody("place", "Ohhh!! you forgot to tell where to come").notEmpty();
    req.checkBody("date", "Ohh!! pls add date").notEmpty();
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
exports.deleteEvent = async (req,res) => {
    const userData = await Event.findOneAndRemove({_id:req.params.id})
    res.json({ error: false, errors: [], data: userData });
}