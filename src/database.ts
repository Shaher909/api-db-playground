import dotnev from "dotenv";
import { Pool } from "pg";

dotnev.config(); // Load environment variables from .env file

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_HOST } =
  process.env; // Destructure environment variables

const client = new Pool({
  user: POSTGRES_USER,
  host: POSTGRES_HOST,
  database: POSTGRES_DB,
  password: POSTGRES_PASSWORD,
});

export default client; // Export the client for use in other modules
