const Event = require('../models/Event');


exports.getEventsList = async (req, res) => {
    const eventsList = await Event.getEventsList();
	res.json({ error: false, errors: [], data: eventsList });
};