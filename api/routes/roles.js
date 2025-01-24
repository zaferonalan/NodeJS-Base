const express = require("express");
const router = express.Router();

const Roles = require("../db/models/Roles");
const RolePrivileges = require("../db/models/RolePrivileges");
const Response = require("../lib/Response");
const CustomError = require("../lib/Error");
const Enum = require("../config/Enum");

router.get("/", async(req, res) => {
    try {
        let roles = await Roles.find({});
        res.json(Response.successResponse(roles))
    } catch (err) {
        let errorResponse = Response.errorResponse(err);
        res.status(errorResponse.code).json(errorResponse);
    }
})

router.post("/add", async(req, res) => {
    let body = req.body;
    try {
        
        if(!body.role_name) throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST,"Validation Erorr!", "role_name field must be filled")

        let role = new Roles({
            role_name: body.role_name,
            is_active: true,
            created_by: req.user?.id
        })

        await role.save();
        res.json(Response.successResponse({ success: true, role }));
    } catch (err) {
        let errorResponse = Response.errorResponse(err);
        res.status(errorResponse.code).json(errorResponse);
    }
})

router.put("/update", async(req, res) => {
    let body = req.body;

    try {
        if(!body._id) throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST, "Validation Error", "_id field must be filled");
        
        let updates = {}
        if(body.role_name) updates.role_name = body.role_name
        if(typeof body.is_active === "boolean") updates.is_active = body.is_active

        await Roles.updateOne({_id: body._id}, updates)
        res.json(Response.successResponse({success: true}))

    } catch (err) {
        let errorResponse = Response.errorResponse(err);
        res.status(errorResponse.code).json(errorResponse);
    }
})

router.delete("/delete", async(req, res) => {
    let body = req.body

    try {
        if(!body._id) throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST, "Validation Error", "_id field must be filled")
        
        await Roles.deleteOne({_id: body._id})
        res.json(Response.successResponse({success: true}))

        } catch (err) {
        let errorResponse = Response.errorResponse(err);
        res.status(errorResponse.code).json(errorResponse);
    }
})

module.exports = router;