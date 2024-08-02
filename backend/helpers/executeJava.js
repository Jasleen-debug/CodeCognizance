import { exec } from 'child_process'
const executeJava = async (filepath, inputFilePath) => {//D:\CodeCognizance\backend\helpers\codes\bc4dc755-716d-4083-88e9-a5a42cbf4e58.java
  return new Promise((resolve, reject) => {
    const startTime = Date.now()
    exec(`java "${filepath}" < ${inputFilePath}`,
      (error, stdout, stderr) => {
        const endTime = Date.now()
        const runtime = endTime - startTime
        let feedback = 'Compiled Successfully'
        if (error) {
          const cleanedError = error.message.replace(/(File\s")?(.*?\.(py|cpp|java|txt))"?/g, '$1<hidden path>.$3"')
          const cleanedStderr = stderr.replace(/(File\s")?(.*?\.(py|cpp|java|txt))"?/g, '$1<hidden path>.$3"')

          const em = `${error}\n\n${stderr}`
          const cleanedem = `${cleanedError}\n\n${cleanedStderr}`

          feedback = 'Compilation Error'
          reject({output: cleanedem, runtime, feedback})
        }
        if (stderr) {
          const cleanedStderr = stderr.replace(/(File\s")?(.*?\.(py|cpp|java|txt))"?/g, '$1<hidden path>.$3"')
          feedback = 'Runtime Error'
          reject({output: cleanedStderr, runtime, feedback})
        }
        resolve({ output: stdout, runtime, feedback })
      }
    )
  })
}

export default executeJava