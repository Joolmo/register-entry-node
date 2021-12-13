import { useState } from "react";
import { usePeople } from './CustomHooks/usePeople'

function App() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [employee, setEmployee] = useState(false);
  const { registerPerson } = usePeople();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // alert(`Id: ${id} \n Name: ${name} \n Surname: ${surname} \n Employee: ${employee}`);
    registerPerson({
      Id: id,
      Name: name,
      Surname: surname,
      Employee: employee
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
          Id: <input type="text" value={id} onChange={(e) => setId(e.target.value)}/>
        </label>
        <br/>
        <label>
          Name: <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
        </label>
        <br/>
        <label>
          Surname: <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)}/>
        </label>
        <br/>
        <label>
          Employee: <input type="checkbox" value={employee} onChange={(e) => setEmployee(e.target.checked)}/>
        </label>
        <br/>
      <input type="submit" />
    </form>
  )
}

export default App;
