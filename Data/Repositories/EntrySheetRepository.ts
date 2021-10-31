import { IEntryRepository } from "../../Domain/RepositoryInterfaces/IEntrySheetRepository"
import { Entry } from '../../Domain/Entitites/Entry'
import path from "path"
import xlsx from 'xlsx'

export class EntrySheetRepository implements IEntryRepository {
    private baseDir: string 
    private fileName: string

    constructor() {
        this.baseDir = !!process.env.BASE_DIR ? process.env.BASE_DIR : __dirname 
        this.fileName = !!process.env.ENTRY_XLSX ? process.env.ENTRY_XLSX : "Entries.xlsx" 
    }

    public  Create(entry/*: Entry*/) {
        const filePath = path.join(this.baseDir, this.fileName)
        const wb = xlsx.readFile(filePath)
        const sheet = wb.Sheets[wb.SheetNames[0]]; 
        
        xlsx.utils.sheet_add_json(sheet, [entry])
        xlsx.writeFile(wb, filePath)
    }

    /*public Get() {
        const filePath = path.join(this.baseDir, this.fileName)
        const wb = xlsx.readFile(filePath)
        const sheet = wb.Sheets[wb.SheetNames[0]]; 
        
        let rows = sheet["!rows"]
    }
    */
}