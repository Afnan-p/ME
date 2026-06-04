import express from 'express';
import Setting from '../models/Setting.js';

const router = express.Router();

// Get all settings
router.get('/', async (req, res) => {
  try {
    const settings = await Setting.find();
    // Convert array of {key, value} to a single object { [key]: value } for easier frontend consumption
    const settingsObj = settings.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});
    res.status(200).json(settingsObj);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching settings', error: error.message });
  }
});

// Get setting by key
router.get('/:key', async (req, res) => {
  try {
    const setting = await Setting.findOne({ key: req.params.key });
    if (!setting) {
      return res.status(404).json({ message: 'Setting not found' });
    }
    res.status(200).json(setting.value);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching setting', error: error.message });
  }
});

// Update or create setting
router.put('/:key', async (req, res) => {
  try {
    const updatedSetting = await Setting.findOneAndUpdate(
      { key: req.params.key },
      { value: req.body.value },
      { new: true, upsert: true }
    );
    res.status(200).json(updatedSetting);
  } catch (error) {
    res.status(500).json({ message: 'Error updating setting', error: error.message });
  }
});

export default router;
