const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const Schema = mongoose.Schema;
const passwordComplexity = require("joi-password-complexity");

const userSchema = new Schema(
    {
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        email: {type: String, required:true, unique: true},
        password: {type: String, required: true},
        type: {type: String, required: true},
    },
    {timestamps: true}
);

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};
const userModel = mongoose.model("user",userSchema,"UsersData");

//Validation Joi 
const validateUser = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().required().label("First Name"),
		lastName: Joi.string().required().label("Last Name"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
        type: Joi.string().required().label("Type"),
	});
	return schema.validate(data);
};
module.exports = {userModel, validateUser};

