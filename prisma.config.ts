import { defineConfig } from "prisma/config";
import { config } from "dotenv";

// Load .env.local so CLI commands pick up the DB URL
config({ path: ".env.local" });

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL!,
  },
});
