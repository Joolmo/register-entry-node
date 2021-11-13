export interface IPersonService {   
    RegisterPerson(): Promise<void>
    GetPersonList(): Promise<void>
    LogPerson(): Promise<void>
}