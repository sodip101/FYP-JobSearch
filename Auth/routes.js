const router=require('express').Router();
const controllers=require('./controllers');

router.post('/google',controllers.googleAuth);
router.post('/facebook',controllers.facebookAuth);
router.post('/save-job',controllers.saveJob);
router.post('/mark-job',controllers.markJob);
router.get('/:id/saved-jobs',controllers.getSavedJobs);
router.get("/:id/applied-jobs", controllers.getAppliedJobs);
router.post("/saved-jobs", controllers.deleteSavedJob);
router.post("/applied-jobs", controllers.deleteAppliedJob);

module.exports=router;