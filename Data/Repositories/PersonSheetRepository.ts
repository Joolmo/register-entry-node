import { IPersonSheetRepository } from '../../Domain/RepositoryInterfaces/IPersonSheetRepository';
import { Person } from '../../Domain/Entities/Person';
import path = require('path');
import xlsx = require('xlsx');

export class PersonSheetRepository implements IPersonSheetRepository {
    private baseDir: string;
    private fileName: string;

    constructor() {
        this.baseDir = !!process.env.BASE_DIR ? process.env.BASE_DIR : __dirname;
        this.fileName = !!process.env.PEOPLE_XLSX ? process.env.PEOPLE_XLSX : "People.xlsx";
    }

    Create(person: Person) {
        const filePath = path.join(this.baseDir, this.fileName)
        const wb = xlsx.readFile(filePath);
        const sheet = wb.Sheets[wb.SheetNames[0]];

        xlsx.utils.sheet_add_json(sheet, [person]);
        xlsx.writeFile(wb, filePath); 
    }

    // Get() {

    // }
}