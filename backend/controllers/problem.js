import Problem from '../models/problem.js'

// Get all problems
export const getProblems = async (req, res) => {
  try {
    const problems = await Problem.find();
    res.json(problems);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Create a new problem
export const createProblem = async (req, res) => {
  const { title, description } = req.body;
  console.log("i am here withe the request")
  try {
    const newProblem = new Problem({ title, description });
    const problem = await newProblem.save();
    console.log("added a new problem")
    res.status(201).json(problem);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Update a problem
export const updateProblem = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const problem = await Problem.findByIdAndUpdate(id, { title, description }, { new: true });
    res.json(problem);
  } catch (error) {
    res.status(500).json({ message: 'Server Error',error });
  }
};

// Delete a problem
export const deleteProblem = async (req, res) => {
  const { id } = req.params;
  try {
    await Problem.findByIdAndDelete(id);
    res.json({ message: 'Problem deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

