// src/database/migrate.js

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import pool from "./db.js";

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Go to backend/migrations
const migrationsPath = path.join(__dirname, "../../migrations");

export const runMigrations = async () => {
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