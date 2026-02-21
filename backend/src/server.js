const app = require("./app");

const PORT = process.env.PORT || 5000;
import { runMigrations } from "./database/migrate.js";

// Run DB migrations before starting server
await runMigrations();
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});