// backend/src/database/db.js

// src/database/db.js

import pkg from "pg";
import { dbConfig } from "../config/db.config.js";

const { Pool } = pkg;

const pool = new Pool(dbConfig);

export default pool;