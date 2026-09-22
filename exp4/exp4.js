const express = require('express');
const { createHandler } = require('graphql-http/lib/use/express');
const { buildSchema } = require('graphql');
const { ruruHTML } = require('ruru/server');

// 1. Define the GraphQL Schema
// We define a query called "hello" that returns a String, and "student" that returns an Object.
const schema = buildSchema(`
  type Student {
    id: ID!
    name: String!
    branch: String!
    semester: Int!
  }

  type Query {
    hello: String
    student: Student
  }
`);

// 2. Define the Resolvers (Root Value)
// Resolvers provide the actual data logic for the schema fields.
const rootValue = {
  hello: () => {
    return 'Hello World! Welcome to the FSD GraphQL Experiment.';
  },
  student: () => {
    return {
      id: 'BTECH101',
      name: 'Rahul Sharma',
      branch: 'Computer Science',
      semester: 3
    };
  }
};

// 3. Initialize Express
const app = express();

// 4. Create the GraphQL HTTP endpoint
app.all('/graphql', createHandler({
  schema: schema,
  rootValue: rootValue,
}));

// 5. Serve the Ruru IDE client for testing queries in the browser
app.get('/', (_req, res) => {
  res.type('html');
  res.end(ruruHTML({ endpoint: '/graphql' }));
});

// 6. Start the server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}/`);
  console.log(`🧪 Test your GraphQL queries at http://localhost:${PORT}/`);
});
