import { Pool } from 'pg';

export class DatabaseClient {
    private readonly pool: Pool;

    constructor() {
        // Konfiguracja powinna być w ENV, ale hardcode na start jest OK
        // Tworzymy instancję OD RAZU z dobrą konfiguracją
        this.pool = new Pool({
            // Zamiast stringa, użyj:
            host: process.env.DB_HOST,
            port: 5432,
            database: 'postgres',
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        });
    }

    async executeQuery<T>(query: string, values: any[] = []): Promise<T[]> {
        try {
            const result = await this.pool.query(query, values);
            return result.rows; // pg zwraca any[], rzutowanie nastąpi przy return
        } catch (error) {
            // Rzucamy zwykły Error, bo DatabaseError z 'pg' jest trudny do instancjonowania ręcznie
            throw new Error(`DB Query Failed: ${query}. Reason: ${error}`);
        }
    }

    async close() {
        await this.pool.end();
    }
}