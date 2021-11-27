import { Handler, Listener } from "../../Helpers";
import { RequestRegisterPersonDto } from "../Dto";
import { IPersonService } from "../Services/IPersonService";

@Handler("person")
export class PersonHandler {
    private personService: IPersonService;

    constructor(personSevice: IPersonService) {
        this.personService = personSevice
    }

    @Listener("register")
    public RegisterPerson(personDto: RequestRegisterPersonDto) {
        return this.personService.RegisterPerson(personDto)
    }
}