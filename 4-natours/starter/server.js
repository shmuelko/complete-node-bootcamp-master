const app = require('./app');

const post = 3000;
app.listen(post, () => {
  console.log(`Server running on port ${post}`);
});
