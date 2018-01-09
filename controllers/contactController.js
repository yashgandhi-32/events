const Contact = require('../models/Contact');

exports.submitQuery = function (req, res) {
    var contact = new Contact(req.body)
    contact.save().then((resp) => {
        if (resp) {
            res.json({ error: false, errors: [], data: resp });
        }
    }).catch((err) => {
        res.json({ error: true, errors: [{ "param": event, msg: "err.message" }], data: [] })
    })
}

exports.getQueries = async function(req,res){
    const queries = await Contact.getQueries();
    res.json({ error: false, errors: [], data: queries });
}

exports.getQuery = async function(req,res){
    let result = await Contact.findOne({ _id: req.params.id });
    res.json({ error: false, errors: [], data: result });
}