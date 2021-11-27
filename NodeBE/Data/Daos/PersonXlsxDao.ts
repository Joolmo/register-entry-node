import { DaoConfiguration } from "../Configuration/DaoConfiguration";
import { IPersonDao } from "../DaoInterfaces/IPersonDao";
import { Person } from "../Entities/Person";
import { BaseXlsxDao } from "./BaseXlsxDao";
import path = require('path');

export class PersonXlsxDao extends BaseXlsxDao<Person> implements IPersonDao {
    public constructor(config: DaoConfiguration) {
        const baseDir = config.basePath;
        const fileName = config.peopleFile;
        super(path.join(baseDir, fileName))
    }
}