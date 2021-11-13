import { BaseXlsxDao } from "../Data/Daos/BaseXlsxDao"
import assert = require('assert');

describe("El puto xlslx test", () => {
    it("Should return all existing entities", async () => {
        type TestDao = {
            id: number
        }

        const repository = new BaseXlsxDao<TestDao>("./dist/NodeBE/Test/test.xlsx")
        
        const daos = await repository.get();
        
        const expected = 1
        const lenthOfDao = daos.length;
        console.log(lenthOfDao);

        assert(expected == lenthOfDao)
    })
})