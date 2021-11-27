import { Handler, Listener } from "../../Helpers";
import { RequestLoginPersonDto, RequestRegisterPersonDto } from "../Dto";
import { IPersonService } from "../Services/IPersonService";

@Handler("person")
export class PersonHandler {
    private personService: IPersonService;

    constructor(personSevice: IPersonService) {
        this.personService = personSevice
    }

    @Listener("register")
    public RegisterPerson(registerDto: RequestRegisterPersonDto) {
        return this.personService.RegisterPerson(registerDto)
    }

    @Listener("log")
    public LogPerson(logDto: RequestLoginPersonDto) {
        return this.personService.LogPerson(logDto)
    }

    @Listener("getAll")
    public GetPersonList() {
        return this.personService.GetPersonList()
    }
}