const express=require('express');
const homeController=require('../controlers/home_controller') 
const router=express.Router();



router.get('/', homeController.home)
router.use('/users',require('./users'));
console.log('router loaded');



module.exports = router;

