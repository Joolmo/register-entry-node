import { Entry } from "../Entities/Entry";

export type IEntryRepository = {
    Create(entry: Entry): void 
    //Get(): Entry[]
}