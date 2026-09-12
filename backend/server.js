const app = require('./src/app');

const PORT = process.env.PORT || 3001;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`=================================================`);
  console.log(` FOODIE-EXPRESS REST API Server running`);
  console.log(` URL: http://localhost:${PORT}`);
  console.log(` Student name: Navin Kumar T`);
  console.log(` School of Electronics Engineering, VIT Chennai`);
  console.log(`=================================================`);
});
