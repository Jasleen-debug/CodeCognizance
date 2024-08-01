import { exec } from 'child_process'
const executePy = async (filepath, inputFilePath) => {
  return new Promise((resolve, reject) => {
    const startTime = Date.now()
    exec(`python "${filepath}" < ${inputFilePath}`,
      (error, stdout, stderr) => {
        const endTime = Date.now()
        const runtime = endTime - startTime
        const feedback = 'Compiled Successfully'
        if (error) {
          const em = `${error}\n${stderr}`
          feedback = 'Compilation Error'
          reject({output: em, runtime, feedback})
        }
        if (stderr) {
          feedback = 'Runtime Error'
          reject({output: stderr, runtime, feedback})
        }
        resolve({ output: stdout, runtime, feedback })
      }
    )
  })
}

export default executePy