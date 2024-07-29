
import TestCase from '../models/testcase.js'
import generateInputFile from './generateInputFile.js'
import executeCpp from './executeCpp.js'
import executePy from './executePy.js'
import executeJava from './executeJava.js'

const processTestCase = async (language, codeFilePath, problemId) => {
  const testCases = await TestCase.find({ problemId }).sort({ title: 1 })
  const results = []
  if (testCases === undefined) {
    return "Unable to provide a verdict as no test case found"
  }

  for (const testcase of testCases) {
    const { title, input, expectedOutput } = testcase
    let compileOutput
    try {
      const inputFilePath = await generateInputFile(input)

      switch (language) {
        case 'cpp':
          compileOutput = await executeCpp(codeFilePath, inputFilePath)
        break
        case 'py':
          compileOutput = await executePy(codeFilePath, inputFilePath)
        break
        case 'java':
          compileOutput = await executeJava(codeFilePath, inputFilePath)
        break
      }
      console.log(compileOutput)
      const isCorrect = compileOutput.trim() === expectedOutput.trim()
      results.push({
        title,
        input,
        expectedOutput,
        userOutput: compileOutput,
        isCorrect
      })
      if (!isCorrect) {
        break
      }
    } catch (error) {
      console.log(error)
      results.push({
        title,
        input,
        expectedOutput,
        error: error.message || error,
        isCorrect: false
      })
      break
    }
  }

  const success = results.every(result => result.isCorrect)
  return {success, results}
}

export default processTestCase



