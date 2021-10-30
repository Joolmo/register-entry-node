import { IPersonSheetRepository } from '../../Domain/RepositoryInterfaces/IPersonSheetRepository';
import path = require('path');
import xlsx = require('xlsx');

export class PersonSheetRepository implements IPersonSheetRepository {
    private baseDir: string;
    private fileName: string;

    constructor() {
        this.baseDir = !!process.env.BASE_DIR ? process.env.BASE_DIR : __dirname;
        this.fileName = !!process.env.PEOPLE_XLSX ? process.env.PEOPLE_XLSX : "People.xlsx";
    }

    private LoadWS() {
        const wb = xlsx.readFile(path.join(this.baseDir, this.fileName));
        return wb.Sheets[wb.SheetNames[0]]; 
    }

    Create() {
        
    }

    // Get() {

    // }
}