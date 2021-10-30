const EntrySheetRepository = require("./Data/Repositories/EntrySheetRepository")

let test = new EntrySheetRepository()

test.Create({
    Name: "Jose",
    "Date": new Date(),
    Employee: "efsdfsdf",
    Mask: 2,
    ID: "sdfsd",
    Surname: "Olmos"
})