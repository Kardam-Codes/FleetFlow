const fs = require("fs");
const path = require("path");
const pool = require("./db");

const migrationsPath = path.join(__dirname, "../../migrations");

const runMigrations = async () => {
  try {
    if (!fs.existsSync(migrationsPath)) {
      console.log("No migrations folder found. Skipping migrations.");
      return;
    }

    const files = fs.readdirSync(migrationsPath);

    for (const file of files) {
      const filePath = path.join(migrationsPath, file);
      const sql = fs.readFileSync(filePath, "utf-8");

      console.log(`Running migration: ${file}`);
      await pool.query(sql);
    }

    console.log("All migrations executed successfully.");

  } catch (error) {
    console.error("Migration error:", error);
  }
};

module.exports = { runMigrations };
