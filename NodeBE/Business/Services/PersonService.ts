import { IEntryDao } from "../../Data/DaoInterfaces/IEntryDao";
import { IPersonService } from "./IPersonService";
import { RequestRegisterPersonDto, RequestLoginPersonDto, ResponsePersonListDto, ResponseSuccessfulDto, ResponseErrorDto } from "../Dto";

export class PersonService implements IPersonService{
    private entryDao: IEntryDao
    
    constructor(entryDao: IEntryDao) {
        this.entryDao = entryDao
    }
    
    GetPersonList(): Promise<ResponsePersonListDto | ResponseErrorDto> 
    {
        throw new Error("Method not implemented.");
    }

    LogPerson(requestLoginPersonDto: RequestLoginPersonDto): Promise<ResponseSuccessfulDto | ResponseErrorDto> 
    {
        throw new Error("Method not implemented.");
    }

    async RegisterPerson(requestRegisterPersonDto: RequestRegisterPersonDto): Promise<ResponseSuccessfulDto | ResponseErrorDto> 
    {

        if(await this.entryDao.find({where: (entry) => requestRegisterPersonDto.Id == entry.Id}))
        {
            return {
                ErrorMessage: "The Id you want to register already exist."
            };
        }

        
    }
}