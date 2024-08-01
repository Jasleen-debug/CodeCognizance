import fs from 'fs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import { exec } from 'child_process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const outputPath = path.join(__dirname, 'outputs')

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, {recursive: true}) //also create any parent directories if they dont exist
}

const executeCpp = async (filepath, inputFilePath) => { //D:\CodeCognizance\backend\helpers\codes\bc4dc755-716d-4083-88e9-a5a42cbf4e58.cpp
  const jobId = path.basename(filepath).split(".")[0] //"bc4dc755-716d-4083-88e9-a5a42cbf4e58"."cpp"
  const output_filename =  `${jobId}.out` // .exe for windows and .out is for mac and linux - bc4dc755-716d-4083-88e9-a5a42cbf4e58.exe
  const outPath = path.join(outputPath, output_filename) //D:\CodeCognizance\backend\helpers\outputs\bc4dc755-716d-4083-88e9-a5a42cbf4e58.exe

  return new Promise((resolve, reject) => {
    const startTime = Date.now()//Start time of code execution
    exec(`g++ ${filepath} -o ${outPath} && cd ${outputPath} && ./${output_filename} < ${inputFilePath}`, //.\\ => ./ mac
      (error, stdout, stderr) => {
        const endTime = Date.now()
        const runtime = endTime - startTime
        const feedback = 'Compiled Successfully'

        if (error) {
          const em = `${error}\n${stderr}`
          feedback = 'Compilation Error'
          reject({ output: em, runtime, feedback})
        }
        if (stderr) {
          feedback = 'Runtime Error'
          reject({ output: stderr, runtime, feedback })
        }
        resolve({ output: stdout, runtime, feedback })
      }
    )
  })
}

export default executeCpp