import generateFile from "../helpers/generateFile.js"
import processTestCases from "../helpers/processTestCases.js"
import Submission from '../models/submission.js'
import User from '../models/user.js'
import Problem from '../models/problem.js'

const judge = async (req, res) => {
  const { language = 'cpp', code, problemId } = req.body
  const userId  = req.user //we will get the id from auth middleware
  if (code === undefined) {
    return res.status(500).json({"success": false, message: "Empty code"})
  }

  try {
    const codeFilePath = await generateFile(language, code)
    const { success, results } = await processTestCases(language, codeFilePath, problemId)
    console.log(success)
    console.log(results)
    console.log(userId)
    const user = await User.findById(userId)
    console.log(user)
    console.log(problemId)
    const problem = await Problem.findById(problemId)
    console.log(problem)

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
    let newLanguage
    switch (language) {
      case 'cpp':
        newLanguage = 'C++'
        break
      case 'py':
        newLanguage = 'Python'
        break
      case 'java':
        newLanguage = 'Java'
        break
    }
    const newSubmission = new Submission({
      userId,
      problemTitle,
      verdict,
      runtime: averageRuntime,
      language: newLanguage //and ,submissionResults: result - entire results array - do we need it - think about it
    })
    console.log(newSubmission)
    await newSubmission.save()

    res.json({codeFilePath, verdict, results})
  } catch (error) {
      res.status(500).json(error)
  }
}

export default judge