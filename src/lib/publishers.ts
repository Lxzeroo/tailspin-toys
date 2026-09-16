import { asc } from 'drizzle-orm';
import type { Database } from './db';
import { publishers, type PublisherRow } from '../../db/schema';
import type { Publisher } from '../types/game';

type PublisherSelectionRow = Pick<PublisherRow, 'id' | 'name'>;

function mapPublisher(row: PublisherSelectionRow): Publisher {
    return {
        id: row.id,
        name: row.name,
    };
}

/** All publishers ordered by name for deterministic results. */
export async function getAllPublishers(db: Database): Promise<Publisher[]> {
    const rows = await db
        .select({
            id: publishers.id,
            name: publishers.name,
        })
        .from(publishers)
        .orderBy(asc(publishers.name));

    return rows.map(mapPublisher);
}
