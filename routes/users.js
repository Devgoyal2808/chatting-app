const express=require("express");
const router = express.Router();

const userController=require("../controlers/user_controllers");

router.get('/profile',userController.profile);

router.get('/sign-up',userController.signUp);
router.get('/sign-in',userController.signIn);

router.post('/create',userController.create);

module.exports=router;