// src/database/migrate.js

import fs from "fs";
import path from "path";
import pool from "../database/db.js";

// Get project root directory
const __dirname = new URL('.', import.meta.url).pathname;

// Go up 2 levels to reach backend/
const migrationsPath = path.join(__dirname, "../../migrations");

export const runMigrations = async () => {
  try {
    // Read all migration files
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