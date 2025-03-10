import fs from 'fs';
import { faker } from '@faker-js/faker';

// Function to generate todos
const generateTodos = (count = 20) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: faker.lorem.title(),
    completed: faker.datatype.boolean(),
    createdAt: faker.date.past().toISOString()
  }));
};

// Generate API-style data
const apiResponse = {
  todos: generateTodos(), // Array of todos
  total: 20, // Total number of todos
  skip: 0, // Pagination: number of items skipped
  limit: 20 // Pagination: number of items per page
};

// Write to db.json
fs.writeFileSync('server/db.json', JSON.stringify(apiResponse, null, 2));
console.log('Generated db.json with API-style data');