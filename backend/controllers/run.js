import generateFile from "../helpers/generateFile.js"
import executeCpp from "../helpers/executeCpp.js"
import executePy from "../helpers/executePy.js"
import executeJava from "../helpers/executeJava.js"

const run = async (req, res) => {
  const { language = 'cpp', code } = req.body // If lang not provided by user, treat the code as cpp type by default

  if (code === undefined) {
    return res.status(500).json({"success": false, message: "Empty"})
  }

  try {
    const filePath = await generateFile(language, code)

    let output
    switch (language) {
      case 'cpp':
        output = await executeCpp(filePath)
        break
      case 'py':
        output = await executePy(filePath)
        break
      case 'java':
        output = await executeJava(filePath)
        break
    }
    res.json({filePath, output})
  } catch (error) {
      res.status(500).json({"success": false, message: error.message})
  }
}

export default run