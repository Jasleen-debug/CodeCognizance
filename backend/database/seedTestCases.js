import TestCase from '../models/testcase.js'

// Define test cases
const testCases = [
    {
        problemId: '66a29cbe92f116eb1466053b',
        title: 'Test Case 1',
        input: '1 2 3',
        expectedOutput: '6',
    },
    {
        problemId: '66a29cbe92f116eb1466053b',
        title: 'Test Case 2',
        input: '0 0 0',
        expectedOutput: '0',
    },
    {
        problemId: '66a29cbe92f116eb1466053b',
        title: 'Test Case 3',
        input: '100 200 300',
        expectedOutput: '600',
    },
    {
        problemId: '66a31f0198b4a81ec705927b',
        title:'Test Case 1',
        input: '5\n1 2 3 4 5',
        expectedOutput: 'Output Test Case 2',
    }
]

const seedTestCases = async () => {
    try {
        //await TestCase.deleteMany({})//optional
        await TestCase.insertMany(testCases)
        console.log('Test cases seeded successfully')
    } catch (error) {
        console.error('Error seeding test cases:', error)
    }
}

export default seedTestCases