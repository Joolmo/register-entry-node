import { IEntryDao } from "../../Data/DaoInterfaces/IEntryDao";
import { IPersonDao } from "../../Data/DaoInterfaces/IPersonDao";
import { IPersonService } from "./IPersonService";
import moment = require("moment");
import { RequestRegisterPersonDto, RequestLoginPersonDto, ResponsePersonListDto, ResponseSuccessfulDto, ResponseErrorDto } from "../Dto";

export class PersonService implements IPersonService{
    private entryDao: IEntryDao;
    private personDao: IPersonDao;
    
    constructor(entryDao: IEntryDao, personDao: IPersonDao) {
        this.entryDao = entryDao;
        this.personDao = personDao;
    }
    
    GetPersonList(): Promise<ResponsePersonListDto | ResponseErrorDto> 
    {
        throw new Error("Method not implemented.");
    }

    async LogPerson(requestLoginPersonDto: RequestLoginPersonDto): Promise<ResponseSuccessfulDto | ResponseErrorDto> 
    {
        if(await this.entryDao.find({where: (entry) => entry.Id === requestLoginPersonDto.Id}))
        {
            return { ErrorMessage: "This Id was already logged today" };
        }

        if(requestLoginPersonDto.Mask < 0)
        {
            return { ErrorMessage: "The number of masks could not be less than zero" };
        }

        let personToLog = await this.personDao.
                            find({where: (person) => person.Id === requestLoginPersonDto.Id});

        try
        {
            await this.entryDao.create({
                Id: personToLog.Id,
                Name: personToLog.Name,
                Surname: personToLog.Surname,
                Employee: personToLog.Employee,
                Date: moment(new Date()).format("DD/MM/YYYY HH:mm:ss"),
                Mask: requestLoginPersonDto.Mask
            });
            
            return { SuccesfulMessage: "Logged successfully" };

        } catch (error) {
            console.log(error);
            return { ErrorMessage: "Unexpected error" };
        }
    }

    async RegisterPerson(requestRegisterPersonDto: RequestRegisterPersonDto): Promise<ResponseSuccessfulDto | ResponseErrorDto> 
    {

        if(await this.personDao.find({where: (person) => person.Id === requestRegisterPersonDto.Id}))
        {
            return { ErrorMessage: "The Id you want to register already exist" };
        }

        try
        {
            await this.personDao.create({
                Id: requestRegisterPersonDto.Id,
                Name: requestRegisterPersonDto.Name,
                Surname: requestRegisterPersonDto.Surname,
                Employee: requestRegisterPersonDto.Employee
            });
    
            return { SuccesfulMessage: "Registered successfully" };

        }catch(error) {

            console.log(error);
            return { ErrorMessage: "Unexepected error" };
        }
    }
}