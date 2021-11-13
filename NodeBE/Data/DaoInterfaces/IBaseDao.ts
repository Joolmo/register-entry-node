export type QueryObject<T> = {
    where: (entity: T) => boolean
}

export interface IBaseDao<T extends object> {
    create(entity: T): Promise<void>;
    get(): Promise<T[]>;
    where(queryObject): Promise<T[]>;
    find(queryObject): Promise<T>
}