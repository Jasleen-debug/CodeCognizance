import { useState, useEffect } from "react"
import { useAuth } from "../hooks/useAuth";
import { getSubmissions } from '../services/submissionService'

export const SubmissionsPage = () => {
  const { auth } = useAuth()
  const [submissions, setSubmissions] = useState([])

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await getSubmissions()
        setSubmissions(response)
      } catch (error) {
        console.error("Error fetching submissions:", error)
      }
    }

    fetchSubmissions()
  }, [])

  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Problem Title</th>
          <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Verdict</th>
          <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Runtime (ms)</th>
          <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Language</th>
        </tr>
      </thead>
      <tbody>
      {submissions.length === 0 ? (
        <tr>
          <td colSpan="4" className="text-center py-3 px-4 text-gray-500">
            No submissions available for {auth.user?.firstName} {auth.user?.lastName}
          </td>
        </tr>
      ) : (
        submissions.map((submission) => (
          <tr key={submission._id}>
            <td className="text-left py-3 px-4">{submission.problemTitle}</td>
            <td className="text-left py-3 px-4">{submission.verdict}</td>
            <td className="text-left py-3 px-4">{submission.runtime}</td>
            <td className="text-left py-3 px-4">{submission.language}</td>
          </tr>
        )))
      }
      </tbody>
    </table>
  )
}