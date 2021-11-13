import { IPersonService } from "./Business/ServiceInterfaces/IPersonService"
import { PersonService } from "./Business/Services/PersonService"
import { DaoConfiguration } from "./Data/Configuration/DaoConfiguration"
import { IEntryDao } from "./Data/DaoInterfaces/IEntryDao"
import { EntryXlsxDao } from "./Data/Daos/EntryXlsxDao"
import { Container } from "./Helpers/IoC"
import { promises as Fs} from 'fs'

type InjectionsList = {
    IEntryDao: IEntryDao,
    DaoConfiguration: DaoConfiguration,
    IPersonService: IPersonService
}

const setUpConfiguration = () => {
    const filePath = process.env.CONFIGURATION_FILE
    return Fs.readFile(filePath).then(rawFile => JSON.parse(rawFile.toString()))
}

const setUpDependencies = async (container: Container<InjectionsList>) => {
    const config = await setUpConfiguration()

    container.Register("IPersonService", c => new PersonService(c.IEntryDao)).asTransient()
    container.Register("IEntryDao", c => new EntryXlsxDao(c.DaoConfiguration)).asTransient()
    container.Register("DaoConfiguration", _ => config).asConfiguration()
}

const setUpListeners = (ipcMain: Electron.IpcMain, container: Container<InjectionsList>) => {
    ipcMain.handle("RegisterUserRequest", async (event, args) => {
        const personService = container.dependencies.IPersonService;
        await personService.RegisterPerson(); 
        return true;
    })
}

const container = new Container<InjectionsList>();
export const setUpNodeBe = (ipcMain: Electron.IpcMain) => {
    setUpDependencies(container);
    setUpListeners(ipcMain, container)
} 