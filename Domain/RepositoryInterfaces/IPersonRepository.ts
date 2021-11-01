import { Person } from '../Entities/Person';

export interface IPersonRepository {
    create(person: Person): Promise<void>;
    get(): Promise<Person[]>;
    getById(Id: string): Promise<Person | undefined>
}