const messages = require('../model/message-model')

exports.deleteMsg = (req, res, next) => {

    messages.findOneAndDelete({_id: req.body.id}, (err, data) => {
        if(err){
            res.send(err)
        }
        res.redirect('/')
    })

}