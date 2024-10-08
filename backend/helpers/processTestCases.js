
import TestCase from '../models/testcase.js'
import generateInputFile from './generateInputFile.js'
import executeCpp from './executeCpp.js'
import executePy from './executePy.js'
import executeJava from './executeJava.js'


const processTestCases = async (language, codeFilePath, problemId) => {
  const testCases = await TestCase.find({ problemId }).sort({ title: 1 })
  let results = []
  if (!testCases || testCases.length === 0) {
    return "Unable to provide a verdict as no test case found"
  }

  for (const [index, testcase] of testCases.entries()) {
    const { title, input, expectedOutput } = testcase
    let compileResult
    try {
      const inputFilePath = await generateInputFile(input)

      switch (language) {
        case 'cpp':
          compileResult = await executeCpp(codeFilePath, inputFilePath)
        break
        case 'py':
          compileResult = await executePy(codeFilePath, inputFilePath)
        break
        case 'java':
          compileResult = await executeJava(codeFilePath, inputFilePath)
        break
      }
      console.log('result of comple',compileResult)// output and runtime result.output and result.runtime
      const isCorrect = compileResult.output.trim() === expectedOutput.trim()

      let message = ''

      if (compileResult.feedback === 'Compilation Error' && !isCorrect) {
        message = compileResult.feedback
      } else if (compileResult.feedback === 'Runtime Error' && !isCorrect) {
        message = compileResult.feedback
      } else if (compileResult.feedback === 'Compiled Successfully' && !isCorrect) {
        message = `Failed at test case ${index+1}`
      } else {
        message = 'Accepted'
      }

      results.push({
        title,
        input,
        expectedOutput,
        userOutput: compileResult.output,
        runtime: compileResult.runtime, //runtime per test case
        description: message,
        isCorrect
      })

      if (!isCorrect) {
        break
      }
    } catch (error) {
      results.push({
        title,
        input,
        expectedOutput,
        userOutput: error.message || error.output,
        runtime: error.runtime || 0,
        description: error.feedback || 'There is an error in your code',
        isCorrect: false
      })
      break
    }
  }

  const success = results.every(result => result.isCorrect)
  return {success, results}
}

export default processTestCases



