import Submission from '../models/submission.js'

// Route to get submissions for a user
export const getSubmissions = async (req, res) => {
  try {
      const userId  = req.user.id //we will get the id from auth middleware
      const submissions = await Submission.find({ userId })
      res.status(200).json(submissions)
  } catch (err) {
      res.status(400).json({ error: err.message })
  }
};
