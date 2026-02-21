const app = require("./app");
const { runMigrations } = require("./database/migrate");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

async function startServer() {
  await runMigrations();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
