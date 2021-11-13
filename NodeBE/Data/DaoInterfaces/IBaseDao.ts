export interface IBaseDao<T extends object> {
    create(entity: T): Promise<void>;
    get(): Promise<T[]>;
}