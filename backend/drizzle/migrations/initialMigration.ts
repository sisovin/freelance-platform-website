import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';
import * as schema from '../schema';
import { config } from 'dotenv';

// Load environment variables
config();

const initialMigration = async () => {
  try {
    // Create PostgreSQL connection pool
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });

    console.log('Connected to PostgreSQL');

    // Initialize Drizzle with the schema
    const db = drizzle(pool, { schema });

    // Run migrations
    await migrate(db, { migrationsFolder: './drizzle/migrations' });

    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Error during initial migration:', error);
    process.exit(1);
  }
};

initialMigration();
