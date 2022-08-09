const dotenv = require('dotenv').config()
const message_model = require('./model/message-model')




// message_model.findById("62e466c01b09f07fcacd3287", (err, data) => {

//     if(err){
//     console.log(err)
//     }
//     console.log(data)
    
// }).select({__v: 0})



const test = async function() {

    //  message_model.findById("62e6c27f19930e4ae7e5c012", (err, data) => {

    //     if(err){
    //         console.error(err)
    //     }
    //     console.log(data)
    // })


    const usr = await message_model.where('_id').equals("62e6c27519930e4ae7e5c00c")
    console.log(usr)
}

test()