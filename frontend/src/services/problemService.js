import axios from 'axios';

// Fetch all problems
export const getProblems = async () => {
  const response = await axios.get('/problems/');
  console.log(response.data)
  return response.data;
};

// Fetch a given problem
export const getProblem = async (id) => {
  const response = await axios.get(`/problems${id}/`);
  return response.data;
};

// Create a new problem
export const createProblem = async (problem) => {
  const response = await axios.post('/problems', problem);
  return response.data;
};

// Update an existing problem
export const updateProblem = async (id, updatedProblem) => {
  const response = await axios.put(`/problems/${id}`, updatedProblem);
  return response.data;
};

// Delete a problem
export const deleteProblem = async (id) => {
  await axios.delete(`/problems/${id}`);
};
