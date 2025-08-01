const express = require("express");
const router = express.Router();
const upload = require('../middleware/upload');
const {getAllExperiences, addExperience, getExperience, updateExperience, deleteExperience} = require('../controllers/experiencesControllers');

router.get('/', getAllExperiences);
router.post('/', upload.single('image'), addExperience);
router.get('/:id', getExperience);
router.patch('/:id', upload.single('image'), updateExperience);
router.delete('/:id', deleteExperience);

module.exports = router;