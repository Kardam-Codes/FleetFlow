// backend/src/server.js

import app from "./app.js";
import { ENV } from "./config/env.js";
import { runMigrations } from "./database/migrate.js";

// Run DB migrations before starting server
await runMigrations();

app.listen(ENV.PORT, () => {
  console.log(`🚀 Server running on port ${ENV.PORT}`);
});