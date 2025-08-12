import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../shared/schema';

// Database connection
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set');
}

// Create database client
const client = postgres(connectionString);
const db = drizzle(client, { schema });

// Storage interface
export interface IStorage {
  getUser(id: number): Promise<schema.User | undefined>;
  getUserByUsername(username: string): Promise<schema.User | undefined>;
  createUser(user: schema.InsertUser): Promise<schema.User>;
}

// Database storage implementation
export class DatabaseStorage implements IStorage {
  private db: typeof db;

  constructor(database: typeof db) {
    this.db = database;
  }

  async getUser(id: number): Promise<schema.User | undefined> {
    const [user] = await this.db
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, id))
      .limit(1);
    return user;
  }

  async getUserByUsername(username: string): Promise<schema.User | undefined> {
    const [user] = await this.db
      .select()
      .from(schema.users)
      .where(eq(schema.users.username, username))
      .limit(1);
    return user;
  }

  async createUser(user: schema.InsertUser): Promise<schema.User> {
    const [newUser] = await this.db.insert(schema.users).values(user).returning();
    return newUser;
  }
}

// Export a singleton instance
export const storage = new DatabaseStorage(db);
