export type QueryObject<T> = {
    where: (entity: T) => boolean
}

export interface IBaseDao<T extends object> {
    create(entity: T): Promise<void>;
    get(): Promise<T[]>;
    where(query: QueryObject<T>): Promise<T[]>;
    find(query: QueryObject<T>): Promise<T>
}