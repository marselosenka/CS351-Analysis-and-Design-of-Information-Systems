import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
export declare class DatabaseService implements OnModuleInit, OnModuleDestroy {
    private pool;
    onModuleInit(): Promise<void>;
    private waitForDatabase;
    private ensureEventsTable;
    private ensureUsersTable;
    private ensureNotificationsTable;
    private ensureSubscribersTable;
    private ensureFavoritesTable;
    private ensureContentCreatorsTable;
    onModuleDestroy(): Promise<void>;
    query(sql: string, params?: any[]): Promise<any>;
}
