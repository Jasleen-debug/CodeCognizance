import generateFile from "../helpers/generateFile.js"

const run = async (req, res) => {
  const { language = 'cpp', code } = req.body // If lang not provided by user, treat the code as cpp type by default

  if (code === undefined) {
    return res.status(500).json({"success": false, message: "Empty"})
  }

  try {
    const filePath = await generateFile(language, code)
    res.json({filePath})
  } catch (error) {
      res.status(500).json({"success": false, message: error.message})
  }

}

export default run