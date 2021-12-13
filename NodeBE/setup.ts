import { IPersonService } from "./Business/Services/IPersonService";
import { PersonService } from "./Business/Services/PersonService";
import { DaoConfiguration } from "./Data/Configuration/DaoConfiguration";
import { IEntryDao } from "./Data/DaoInterfaces/IEntryDao";
import { IPersonDao } from "./Data/DaoInterfaces/IPersonDao";
import { EntryXlsxDao } from "./Data/Daos/EntryXlsxDao";
import { Container } from "./Helpers/IoC";
import { promises as Fs} from 'fs';
import { PersonXlsxDao } from "./Data/Daos/PersonXlsxDao";
import { PersonHandler } from "./Business/Listeners/PersonHandler";
import { ContainerWithHandlers } from "./Helpers";

type InjectionsList = {
    IEntryDao: IEntryDao,
    IPersonDao: IPersonDao,
    DaoConfiguration: DaoConfiguration,
    IPersonService: IPersonService,
    PersonHandler: PersonHandler
}

const setUpConfiguration = (container: Container<InjectionsList>) => {
    // const filePath = process.env.CONFIGURATION_FILE;
    // const config = Fs.readFile(filePath).then(rawFile => JSON.parse(rawFile.toString()));
    container.Register("DaoConfiguration", _ => ({basePath: ".", entriesFile: "entries.xlsx", peopleFile: "people.xlsx"})).asConfiguration()
}

const setUpDependencies = (container: Container<InjectionsList>) => {
    container.Register("IPersonService", c => new PersonService(c.IEntryDao, c.IPersonDao)).asTransient();
    container.Register("IEntryDao", c => new EntryXlsxDao(c.DaoConfiguration)).asTransient();
    container.Register("IPersonDao", c => new PersonXlsxDao(c.DaoConfiguration)).asTransient();
}

const setUpHandlers = (container: ContainerWithHandlers<InjectionsList>) => {
    container.RegisterHandler("PersonHandler", c => new PersonHandler(c.IPersonService))
}

const container = new ContainerWithHandlers<InjectionsList>();
export const setUpNodeBe = () => {
    setUpConfiguration(container)
    setUpDependencies(container);
    setUpHandlers(container)
} 
