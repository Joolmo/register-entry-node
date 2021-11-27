import { Handler, IpcMainHandler, Listener } from "../../Helpers";
import { RequestRegisterPersonDto } from "../Dto";
import { IPersonService } from "../Services/IPersonService";

@Handler("person")
export class PersonHandler extends IpcMainHandler {
    private personService: IPersonService;

    constructor(personSevice: IPersonService) {
        super()
        this.personService = personSevice
    }

    @Listener("register")
    public RegisterPerson(personDto: RequestRegisterPersonDto) {
        return this.personService.RegisterPerson(personDto)
    }
}