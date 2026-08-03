import { body, validationResult } from "express-validator";

export const registerValidation = [

    body("name")
        .notEmpty()
        .withMessage("Name is required"),

    body("email")
        .isEmail()
        .withMessage("Enter valid email"),

    body("phone")
        .isLength({ min:10, max:10 })
        .withMessage("Phone number should contain 10 digits"),

    body("password")
        .isLength({ min:6 })
        .withMessage("Password should be minimum 6 characters")
];

export const validate=(req,res,next)=>{

    const errors=validationResult(req);

    if(!errors.isEmpty()){

        return res.status(400).json({
            success:false,
            errors:errors.array()
        });

    }
    next();
}