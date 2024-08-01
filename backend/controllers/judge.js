import generateFile from "../helpers/generateFile.js"
import processTestCases from "../helpers/processTestCases.js"
import Submission from '../models/submission.js'
import User from '../models/submission.js'
import Problem from '../models/submission.js'

const judge = async (req, res) => {
  const { language = 'cpp', code, problemId, userId } = req.body

  if (code === undefined) {
    return res.status(500).json({"success": false, message: "Empty code"})
  }

  try {
    const codeFilePath = await generateFile(language, code)
    const { success, results } = await processTestCases(language, codeFilePath, problemId)
    console.log(success)
    console.log(results)

    const user = await User.findById(userId)
    const problem = await Problem.findById(problemId)
    if (!user || !problem) {
      return res.status(500).json({ success: false, message: "User or Problem not found" })
    }
    //const username = user.email.split('@')[0] will do this for leader board not per user submissions
    const problemTitle = problem.title
    const verdict = success ? 'Accepted' : results[results.length - 1].description

    // Calculate the total runtime by summing up the runtime values
    const totalRuntime = results.reduce((sum, result) => sum + result.runtime, 0);
    // Calculate the average runtime
    const averageRuntime = totalRuntime / results.length; //we need to find the average of the runtime of all test cases

    const newSubmission = new Submission({
      userId,
      problemTitle,
      verdict,
      averageRuntime,
      language //and ,submissionResults: result - entire results array - do we need it - think about it
    })
    await newSubmission.save()

    res.json({codeFilePath, verdict, results})
  } catch (error) {
      res.json(error)
  }
}

export default judge