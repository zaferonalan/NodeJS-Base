const mongoose = require("mongoose")

const schema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    is_active: {
        type: Boolean,
        required: true
    },
    first_name: String,
    last_name: String,
    phone_number: String
},{
    timestamps: {
        createdAt: "created_at",
        updateAt: "updated_at"
    }
})

class Users extends mongoose.Model{

}

schema.loadClass(Users);
module.exports = mongoose.model("users", schema);