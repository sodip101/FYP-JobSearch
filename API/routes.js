const express=require('express');
const router=express.Router();
const apiController=require('./controllers');

router.post('/database',apiController.insertIntoDatabase);

router.get('/jobs',apiController.searchJobs);

router.get('/portals',apiController.getAllPortals);

router.get('/:portal/categories',apiController.getPortalCategories);


module.exports=router;