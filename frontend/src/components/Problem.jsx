import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getProblem } from '../services/problemService'

export const ProblemDetailPage = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState({});

  const [input, setInput] = useState('')
  const [code, setCode] = useState('')
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('Java')

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await getProblem(id)
        console.log(response)
        setProblem(response)
      } catch (error) {
        console.error('Error fetching problem:', error)
      }
    };
    fetchProblem()
  }, [id])

  if (!problem) {
    return <div>Loading...</div>
  }
  const handleRunCode = async () => {
    // Logic here
    setOutput('')
  };

  return (
    <div className='p-8 overflow-auto'>
    <div className="flex h-screen p-4 border border-gray-300 shadow-lg rounded-lg overflow-auto">
      {/* Left Side */}
      <div className="w-1/2 p-4 border-r border-gray-300 overflow-y-auto">
        <div className="p-4 border border-gray-300 rounded mb-4 h-64 overflow-y-auto">
          <h1 className="text-2xl font-bold mb-4 break-words">{problem.title}</h1>
          <p className="break-words">{problem.description}</p>
        </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
          placeholder="Input"
          className="block w-full h-24 p-2 border border-gray-300 rounded overflow-y-auto"
        />
      </div>
      {/* Right Side */}
      <div className="w-1/2 p-4 flex flex-col overflow-y-auto">
        <div className="flex flex-col mb-4">
          <label className="mb-2 font-semibold">Select Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="p-2 border border-gray-300 rounded mb-4"
            >
            <option value="cpp">C++</option>
            <option value="py">Python</option>
            <option value="java">Java</option>
          </select>
        </div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Write your code here..."
          className="flex-grow p-2 border border-gray-300 rounded mb-4 overflow-y-auto"
        />
        <button
          onClick={handleRunCode}
          className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
        >
          Run Code
        </button>
        <div className="flex-grow p-4 border border-gray-300 rounded overflow-y-auto">
          <h2 className="text-xl font-semibold mb-2">Output</h2>
          <pre>{output}</pre>
        </div>
      </div>
      </div>
    </div>
  )
}


