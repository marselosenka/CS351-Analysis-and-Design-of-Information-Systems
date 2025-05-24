import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
export declare class DatabaseService implements OnModuleInit, OnModuleDestroy {
    private connection;
    onModuleInit(): void;
    private ensureEventsTable;
    private ensureUsersTable;
    private ensureNotificationsTable;
    private ensureSubscribersTable;
    private ensureFavoritesTable;
    private ensureContentCreatorsTable;
    onModuleDestroy(): void;
    query(sql: string, params?: any[]): Promise<any>;
}
