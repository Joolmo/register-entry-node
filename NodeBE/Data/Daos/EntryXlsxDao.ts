import { IEntryDao } from "../DaoInterfaces/IEntryDao";
import { Entry } from "../Entities/Entry";
import { DaoConfiguration } from "../Configuration/DaoConfiguration";
import { BaseXlsxDao } from "./BaseXlsxDao";
import path = require('path');

export class EntryXlsxDao extends BaseXlsxDao<Entry> implements IEntryDao {
    public constructor(config: DaoConfiguration) {
        const baseDir = config.basePath
        const fileName = config.entitiesFile
        super(path.join(baseDir, fileName))
    }
}