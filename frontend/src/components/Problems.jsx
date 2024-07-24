import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { createProblem, getProblems } from '../services/problemService'

export const ProblemsPage = () => {

  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newProblemTitle, setNewProblemTitle] = useState('')
  const [newProblemDescription, setNewProblemDescription] = useState('')
  const [problems, setProblems] = useState([])

  const handleToggleForm = () => {
    setShowCreateForm(!showCreateForm);
  };

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const problemsData = await getProblems()
        console.log("Here", problemsData)
        setProblems(problemsData)
      } catch (error) {
        console.error('Error fetching problems:', error)
      }
    }
    fetchProblems()
  },[])

  const handleCreateProblem = async () => {
    try {
      const newProblem = await createProblem({ title: newProblemTitle, description: newProblemDescription })
      if (newProblem) {
        setProblems((prevProblems) => [...prevProblems, newProblem]);
        setNewProblemTitle('');
        setNewProblemDescription('');
        setShowCreateForm(false);
      }
    } catch (error) {
      console.error('Error creating problem:', error)
    }
  }

  return (
    <>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Problems</h1>

      {/* Button to toggle the create form */}
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleToggleForm}
      >
        {showCreateForm ? 'Hide Form' : 'Create New Problem'}
      </button>

      {/* Create problem form */}
      {showCreateForm && (
        <div className="mb-6 p-4 border border-gray-300 rounded">
          <h2 className="text-xl font-semibold mb-2">Create New Problem</h2>
          <input
            type="text"
            value={newProblemTitle}
            onChange={(e) => setNewProblemTitle(e.target.value)}
            placeholder="Problem Title"
            className="block w-full mb-2 p-2 border border-gray-300 rounded"
          />
          <textarea
            value={newProblemDescription}
            onChange={(e) => setNewProblemDescription(e.target.value)}
            placeholder="Problem Description"
            className="block w-full mb-4 p-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleCreateProblem}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Create Problem
          </button>
        </div>
      )}

      {/* List of problems */}
      {Array.isArray(problems) && problems.length === 0 ? (
        <p className="text-center text-gray-500">No problems available. Please create a new problem.</p>
      ) : (
        <ul className="space-y-4">
          {Array.isArray(problems) && problems.map((problem) => (
            <li key={problem._id} className="p-4 border border-gray-300 rounded">
              <h2 className="text-xl font-semibold mb-2">
                <Link to={`/welcome/problems/${problem._id}`}>{problem.title}</Link>
              </h2>
              <p>{problem.description}</p>
              <div className="mt-4 flex space-x-2">
                <button className="px-4 py-2 bg-yellow-500 text-white rounded">Edit</button>
                <button className="px-4 py-2 bg-red-500 text-white rounded">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
    </>
  )
}