const Experience = require('../models/experience');

const buildImageUrl = (req, file) => {
  if (!file) return undefined;
  return `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
};

const getAllExperiences =  async (req, res) => {
    try {
        const experiences = await Experience.find({});
        res.status(200).json({experiences: experiences});
    } catch (error) {
        res.status(500).json({msg: error});
    }
};

const addExperience = async (req, res) => {
  try {
    const imageUrl = req.file
      ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
      : undefined;

    const experienceData = { ...req.body };
    if (imageUrl) {
      experienceData.image = imageUrl;
    }

    const experience = await Experience.create(experienceData);
    res.status(201).json({ experience });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getExperience = async (req, res) => {
    try {
        const id = req.params.id;
        const experience = await Experience.findOne({_id: id});
        if (!experience)
            return res.status(404).json({msg: "Not found"});
        res.status(200).json({experience});
    } catch (error) {
        res.status(500).json({msg: error});
    }
    
};

const updateExperience = async (req, res) => {
  try {
    const { id } = req.params;

    // Build update payload
    const updateData = {
      ...req.body,
    };

    if (req.file) {
      updateData.image = buildImageUrl(req, req.file);
    }

    const experience = await Experience.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!experience) {
      return res.status(404).json({ msg: 'Experience not found.' });
    }

    res.status(200).json({ experience });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error updating experience.' });
  }
};

const deleteExperience = async (req, res) => {
    try {
        const id = req.params.id;
        const experience = await Experience.findOneAndDelete({_id: id});
        if (!experience)
            return res.status(404).json({msg: "Not found"});
        res.status(200).json({msg: "experience deleted"});
    } catch (error) {
        res.status(500).json({msg: error});
    }
};

module.exports = {
    getAllExperiences, 
    addExperience, 
    getExperience, 
    updateExperience, 
    deleteExperience
}