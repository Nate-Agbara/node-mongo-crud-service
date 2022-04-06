const mongoose = require('mongoose');

const uri = "mongodb+srv://root:root123@cluster0.ymgjl.mongodb.net/nodelearning?retryWrites=true&w=majority";

var Message = mongoose.model('Message', {
    name: String,
    message: String
})

mongoose.connect(uri, (err) => {
    console.log("mongodb connection", err)
});

exports.hello = (req, res) => {
    Message.find({}, (err, messages) => {
        res.send(messages)
    })
};

exports.postMessage = async (req, res) => {

    try{
        var message = new Message(req.body)
        var message = await message.save()
        console.log('saved')

        var censored = await Message.findOne({message: 'badword'})

        if(censored)
            await Message.deleteOne({ _id: censored.id})
        else
            console.log(req.body)
        res.sendStatus(200)

    }catch(error){
        res.sendStatus(500)
        return console.console.error(error);
    }finally{
        //logger.log("post method was called")
    }
        
};