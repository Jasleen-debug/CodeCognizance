import generateFile from "../helpers/generateFile.js"
import processTestCase from "../helpers/processTestCase.js"

const judge = async (req, res) => {
  const { language = 'cpp', code, problemId } = req.body // If lang not provided by user, treat the code as cpp type by default
  console.log("here in judge controller")
  if (code === undefined) {
    return res.status(500).json({"success": false, message: "Empty code"})
  }

  try {
    const codeFilePath = await generateFile(language, code)
    const output = await processTestCase(language, codeFilePath, problemId)
    console.log(output)
    res.json({codeFilePath, output})
  } catch (error) {
      res.json(error)
  }
}

export default judge