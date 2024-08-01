import { exec } from 'child_process'
const executeJava = async (filepath, inputFilePath) => {//D:\CodeCognizance\backend\helpers\codes\bc4dc755-716d-4083-88e9-a5a42cbf4e58.java
  return new Promise((resolve, reject) => {
    const startTime = Date.now()
    exec(`java "${filepath}" < ${inputFilePath}`,
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

export default executeJava