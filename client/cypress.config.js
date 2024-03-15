// const {defineConfig} = require('cypress');
// module.exports = defineConfig({
//   e2e: {
//     baseUrl: 'http://localhost:3000',
//   },
// });
 
import { defineConfig } from "cypress";

export default defineConfig({
  baseUrl: 'http://localhost:3000', // Set the base URL for your tests
  supportFile: false, // Disables the default support file requirement
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // You can keep your existing implementation here or add any necessary changes
    },
  },
});
