import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getProblem } from '../services/problemService'

export const ProblemDetailPage = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await getProblem(id)
        setProblem(response.data);
      } catch (error) {
        console.error('Error fetching problem:', error);
      }
    };
    fetchProblem();
  }, [id]);

  if (!problem) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{problem.title}</h1>
      <p className="mb-4">{problem.description}</p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => window.history.back()}
      >
        Back
      </button>
    </div>
  );
};


