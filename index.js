// start your server here
require("dotenv").config(); // Load environment variables
const server = require("./api/server");

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
server.listen(PORT, () => console.log(`\nAPI running on port ${PORT}\n`))
});