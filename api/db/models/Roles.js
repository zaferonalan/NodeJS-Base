const mongoose = require("mongoose");
const RolePrivileges = require("./RolePrivileges");

const schema = mongoose.Schema({
    role_name: {
        type:String, 
        required: true,
        unique: true
    },
    is_active: {
        type:Boolean,
        default: true,
    },
    created_by: {
        type: mongoose.SchemaTypes.ObjectId,
    }
},{
    versionKey: false,
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
})

class Roles extends mongoose.Model{
    static async deleteOne(query){

        if (query.id) {
            await RolePrivileges.deleteOne({role_id: query.id})
        }
        await super.deleteOne(query)
    }
}

schema.loadClass(Roles);
module.exports = mongoose.model("roles", schema);