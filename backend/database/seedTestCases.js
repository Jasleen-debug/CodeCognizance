import TestCase from '../models/testcase.js'

// Define test cases
const testCases = [
    {
        problemId: '66a03d695a21f349fe350f92',
        title: 'Test Case 1',
        input: '5\n1 2 3 4 5',
        expectedOutput: '15'
    },
    {
        problemId: '66a03d695a21f349fe350f92',
        title: 'Test Case 2',
        input: '3\n-1 -2 -3',
        expectedOutput: '-6'
    },
    {
        problemId: '66a03d695a21f349fe350f92',
        title: 'Test Case 3',
        input: '4\n10 20 30 40',
        expectedOutput: '100'
    },
    {
        problemId: '66a03d695a21f349fe350f92',
        title:'Test Case 4',
        input: '1\n0',
        expectedOutput: '0'
    },
    {
        problemId: '66a03d695a21f349fe350f92',
        title:'Test Case 5',
        input: '6\n1 -1 2 -2 3 -3',
        expectedOutput: '0'
    },

    {
        problemId: '66a29cbe92f116eb1466053b',
        title:'Test Case 1',
        input: '5\n1 2 3 4 5',
        expectedOutput: '5'
    },
    {
        problemId: '66a29cbe92f116eb1466053b',
        title:'Test Case 2',
        input: '3\n-1 -2 -3',
        expectedOutput: '-1'
    },
    {
        problemId: '66a29cbe92f116eb1466053b',
        title:'Test Case 3',
        input: '4\n10 20 30 40',
        expectedOutput: '40'
    },
    {
        problemId: '66a29cbe92f116eb1466053b',
        title:'Test Case 4',
        input: '1\n0',
        expectedOutput: '0'
    },
    {
        problemId: '66a29cbe92f116eb1466053b',
        title:'Test Case 5',
        input: '6\n1 -1 2 -2 3 -3',
        expectedOutput: '3'
    },

    {
        problemId: '66a838c38e4c7d86d30d28b9',
        title:'Test Case 1',
        input: 'hello',
        expectedOutput: 'olleh'
    },
    {
        problemId: '66a838c38e4c7d86d30d28b9',
        title:'Test Case 2',
        input: 'world',
        expectedOutput: 'dlrow'
    },
    {
        problemId: '66a838c38e4c7d86d30d28b9',
        title:'Test Case 3',
        input: 'OpenAI',
        expectedOutput: 'IAnepO'
    },
    {
        problemId: '66a838c38e4c7d86d30d28b9',
        title:'Test Case 4',
        input: 'racecar',
        expectedOutput: 'racecar'
    },
    {
        problemId: '66a838c38e4c7d86d30d28b9',
        title:'Test Case 5',
        input: '12345',
        expectedOutput: '54321'
    },

    {
        problemId: '66a838e28e4c7d86d30d28bb',
        title:'Test Case 1',
        input: '5',
        expectedOutput: '0 1 1 2 3'
    },
    {
        problemId: '66a838e28e4c7d86d30d28bb',
        title:'Test Case 2',
        input: '1',
        expectedOutput: '0'
    },
    {
        problemId: '66a838e28e4c7d86d30d28bb',
        title:'Test Case 3',
        input: '3',
        expectedOutput: '0 1 1'
    },
    {
        problemId: '66a838e28e4c7d86d30d28bb',
        title:'Test Case 4',
        input: '7',
        expectedOutput: '0 1 1 2 3 5 8'
    },
    {
        problemId: '66a838e28e4c7d86d30d28bb',
        title:'Test Case 5',
        input: '10',
        expectedOutput: '0 1 1 2 3 5 8 13 21 34'
    },

    {
        problemId: '66a838fe8e4c7d86d30d28bd',
        title:'Test Case 1',
        input: '5',
        expectedOutput: '120'
    },
    {
        problemId: '66a838fe8e4c7d86d30d28bd',
        title:'Test Case 2',
        input: '0',
        expectedOutput: '1'
    },
    {
        problemId: '66a838fe8e4c7d86d30d28bd',
        title:'Test Case 3',
        input: '3',
        expectedOutput: '6'
    },
    {
        problemId: '66a838fe8e4c7d86d30d28bd',
        title:'Test Case 4',
        input: '7',
        expectedOutput: '5040'
    },
    {
        problemId: '66a838fe8e4c7d86d30d28bd',
        title:'Test Case 5',
        input: '10',
        expectedOutput: '3628800'
    }
]

const seedTestCases = async () => {
    try {
        //await TestCase.deleteMany({})
        await TestCase.insertMany(testCases)
        console.log('Test cases seeded successfully')
    } catch (error) {
        console.error('Error seeding test cases:', error)
    }
}

export default seedTestCases