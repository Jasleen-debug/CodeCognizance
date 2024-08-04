import generateFile from "../helpers/generateFile.js"
import executeCpp from "../helpers/executeCpp.js"
import executePy from "../helpers/executePy.js"
import executeJava from "../helpers/executeJava.js"
import generateInputFile from "../helpers/generateInputFile.js"


const run = async (req, res) => {
  const { language = 'cpp', code, input } = req.body // If lang not provided by user, treat the code as cpp type by default



  // Basic input validation
  if (!code || typeof code !== 'string' || code.trim() === '') {
    return res.json({ success: false, output: "Code is required" });
  }

  if (input === undefined || input === '' || typeof input !== 'string') {
    return res.json({ success: false, output: "Input is required" });
  }

  // Sanitize code and input - no it is changing my code

  try {
    const filePath = await generateFile(language, code)
    const inputFilePath = await generateInputFile(input)
    let compileOutput
    switch (language) {
      case 'cpp':
        compileOutput = await executeCpp(filePath, inputFilePath)
        break
      case 'py':
        compileOutput = await executePy(filePath, inputFilePath)
        break
      case 'java':
        compileOutput = await executeJava(filePath, inputFilePath)
        break
    }

    const output = compileOutput.output
    res.json({filePath, inputFilePath, output})
  } catch (error) {
    console.log(error)
    res.json({ output: error.output })

  }
}

export default run