import { app, BrowserWindow } from 'electron';
import { IPersonService } from './Business/PersonManagement/Services/IPersonService';
import { PersonService } from './Business/PersonManagement/Services/PersonService';
import { PersonSheetRepository } from './Data/Repositories/PersonSheetRepository';
import { Person } from './Domain/Entities/Person';
import { IPersonRepository } from './Domain/RepositoryInterfaces/IPersonRepository';
import { Container } from './Helpers/ContainerIoC';


export default class Main {
    static mainWindow: Electron.BrowserWindow;
    static application: Electron.App;
    static BrowserWindow;
    private static onWindowAllClosed() {
        if (process.platform !== 'darwin') {
            Main.application.quit();
        }
    }

    private static onClose() {
        // Dereference the window object. 
        Main.mainWindow = null;
    }

    private static onReady() {
        Main.mainWindow = new Main.BrowserWindow({ width: 800, height: 600 });
        Main.mainWindow
            .loadURL('file://' + __dirname + '/index.html');
        Main.mainWindow.on('closed', Main.onClose);
    }

    static main(app: Electron.App, browserWindow: typeof BrowserWindow) {
        // we pass the Electron.App object and the  
        // Electron.BrowserWindow into this function 
        // so this class has no dependencies. This 
        // makes the code easier to write tests for 
        Main.BrowserWindow = browserWindow;
        Main.application = app;
        Main.application.on('window-all-closed', Main.onWindowAllClosed);
        Main.application.on('ready', Main.onReady);
    }
}

type Types = {
    IPersonRepository: IPersonRepository,
    IPersonService: IPersonService
}

const container = new Container<Types>()
container.service("IPersonRepository", _ => new PersonSheetRepository())
container.service("IPersonService", c => new PersonService(c.get("IPersonRepository")))
const service = container.get("IPersonService");

service.Register({
    Id: "ee",
    Name: "sd"
});

Main.main(app, BrowserWindow);