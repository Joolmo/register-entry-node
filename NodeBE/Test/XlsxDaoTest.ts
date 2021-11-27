import { BaseXlsxDao } from "../Data/Daos/BaseXlsxDao"
import xlsx = require('xlsx')
import assert = require('assert');
import { promises as fs } from "fs";

const testFilePath = "./dist/NodeBE/Test/test.xlsx"
type TestEntity = {
    id: number,
    name: string
}

const createTestFile = async filePath => {
    try {
        await fs.rm(filePath)
    }
    catch { }
    finally {
        await fs.writeFile(filePath, "")
    }
}

const setTestData = async <T>(filepath: string, testData: T[]) => {
    await createTestFile(filepath)
    const wb = xlsx.readFile(filepath)
    const sh = wb.Sheets[wb.SheetNames[0]]
    xlsx.utils.sheet_add_json(sh, testData);
    xlsx.writeFile(wb, filepath)
    return sh;
}

describe("El puto xlslx test", () => {
    it("Should return all existing entities", async () => {
        // Test data
        const testEntitites: TestEntity[] = [
            {
                id: 1,
                name: "Pepe"
            },
            {
                id: 2,
                name: "Pepa"
            }
        ]
        const expectedLength = testEntitites.length;

        // Setup test file
        await setTestData(testFilePath, testEntitites)

        // test repo
        const repository = new BaseXlsxDao<TestEntity>(testFilePath)
        const results = await repository.get();
        const resultLength = results.length;

        // assertions
        assert(resultLength == expectedLength)
    })
    it("Should find a specific entity", async () => {
        // Test data
        const testEntitites: TestEntity[] = [
            {
                id: 1,
                name: "Pepe"
            },
            {
                id: 2,
                name: "Pepa"
            }
        ]
        const expectedEntity = testEntitites[1];

        // Setup test file
        await setTestData(testFilePath, testEntitites)

        // test repo
        const entityId = expectedEntity.id;
        const repository = new BaseXlsxDao<TestEntity>(testFilePath)
        const resultEntity = await repository.find({where: entity => entity.id == entityId})

        // assertions
        assert(resultEntity.name == expectedEntity.name)
    })  
    it("Should create a new entity", async () => {
        // Test data
        const testEntitites: TestEntity[] = [
            {
                id: 1,
                name: "Pepe"
            },
            {
                id: 2,
                name: "Pepa"
            }
        ]
        const testEntity: TestEntity = {
            id: 10,
            name: "dummy"
        }

        // Setup test file
        const sh = await setTestData(testFilePath, testEntitites)
            
        // test repo
        const repository = new BaseXlsxDao<TestEntity>(testFilePath)
        await repository.create(testEntity)

        const data = xlsx.utils.sheet_to_json<TestEntity>(sh);
        const resultEntity = data.find(ent => ent.id = testEntity.id);

        // assertions
        assert(!!resultEntity);
    })
    it("Should get all entities where condition", async () => {
        // Test data
        const repeatedName = "dummy"
        const testEntitites: TestEntity[] = [
            {
                id: 1,
                name: "Pepe"
            },
            {
                id: 2,
                name: repeatedName
            },
            {
                id: 3,
                name: repeatedName
            }
        ]
        const expectedLength = 2

        // Setup test file
        await setTestData(testFilePath, testEntitites)
            
        // test repo
        const repository = new BaseXlsxDao<TestEntity>(testFilePath)
        const result = await repository.where({where: entity => entity.name == repeatedName})
        const resultLength = result.length

        // assertions
        assert(expectedLength == resultLength);
    })
})