import { Person } from '../Entities/Person';

export interface IPersonSheetRepository {
    Create(person: Person): void;
    // Get(): Person[];
}