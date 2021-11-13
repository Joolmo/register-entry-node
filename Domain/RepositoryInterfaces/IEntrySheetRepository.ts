import { Entry } from "../Entitites/Entry";

export type IEntryRepository = {
    Create(entry: Entry): void 
    //Get(): Entry[]
}