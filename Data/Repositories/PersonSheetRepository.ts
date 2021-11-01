import { IPersonRepository } from '../../Domain/RepositoryInterfaces/IPersonRepository';
import { Person } from '../../Domain/Entities/Person';
import { promises as Fs } from 'fs';
import path = require('path');
import xlsx = require('xlsx');

export class PersonSheetRepository implements IPersonRepository {
    private filePath: string

    public constructor() {
        const baseDir = !!process.env.BASE_DIR ? process.env.BASE_DIR : __dirname;
        const fileName = !!process.env.PEOPLE_XLSX ? process.env.PEOPLE_XLSX : "People.xlsx";
        this.filePath = path.join(baseDir, fileName)
    }

    private async openWB() {
        try { await Fs.access(this.filePath) } 
        catch { await Fs.writeFile(this.filePath, "") }

        return xlsx.readFile(this.filePath);
    } 

    public async create(person: Person) {
        const wb = await this.openWB();
        const sheet = wb.Sheets[wb.SheetNames[0]];

        const people = xlsx.utils.sheet_to_json<Person>(sheet)
        people.push(person)

        xlsx.utils.sheet_add_json(sheet, people);
        xlsx.writeFile(wb, this.filePath); 
    }

    public async get() {
        const wb = await this.openWB();
        const sheet = wb.Sheets[wb.SheetNames[0]];

        const people = xlsx.utils.sheet_to_json<Person>(sheet)
        return people
    }

    public async getById(id: string) {
        return (await this.get()).find(person => person.ID == id)
    }
}