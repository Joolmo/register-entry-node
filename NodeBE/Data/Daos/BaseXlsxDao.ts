import { promises as Fs } from 'fs';
import { IBaseDao } from "../DaoInterfaces/IBaseDao";
import xlsx = require('xlsx');

export class BaseXlsxDao<T extends object> implements IBaseDao<T> {
    private filePath: string

    public constructor(filePath: string) {
        this.filePath = filePath
    }

    private async openWB() {
        try { await Fs.access(this.filePath) } 
        catch { await Fs.writeFile(this.filePath, "") }

        return xlsx.readFile(this.filePath);
    } 

    public async create(entry: T) {
        const wb = await this.openWB();
        const sheet = wb.Sheets[wb.SheetNames[0]];

        const people = xlsx.utils.sheet_to_json<T>(sheet)
        people.push(entry)

        xlsx.utils.sheet_add_json(sheet, people);
        xlsx.writeFile(wb, this.filePath); 
    }

    public async get() {
        const wb = await this.openWB();
        const sheet = wb.Sheets[wb.SheetNames[0]];

        const people = xlsx.utils.sheet_to_json<T>(sheet)
        return people
    }
}
