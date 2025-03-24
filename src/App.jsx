import { useState, useEffect } from "react";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import {ToastContainer, toast} from "react-toastify";

function App() {
  const [users, setUsers] = useState([]);
  const [record , setRecord] =useState({});

  useEffect(() => {
    getUserData();
  }, [setUsers]);

  const getUsers = collection(db, "users");
  const getUserData = async () => {
    let userData = await getDocs(getUsers);
    let usersRecord = [];
    userData.docs.map((doc) => {
      let obj = { ...doc.data(), id: doc.id };
      usersRecord.push(obj);
    });
    setUsers(usersRecord);
  };

  let getInput = (e) =>{
    let name = e.target.name;
    let value = e.target.value;

    setRecord({...record, [name]: value});
    getUserData();
  }

  let submitData = async (e) => {
    e.preventDefault();
    await addDoc(getUsers, record);
    getUserData();
    setRecord({});
    toast.success("Data Added Successfully!!",{
      position:"bottom-right",
      autoClose:2500
    })
  }

  let deleteUser = async(id) => {
    let userDoc = await doc(db, "users", id);
    await deleteDoc(userDoc);
    getUserData();
    toast.success("Data Deleted Successfully!!",{
      position:"bottom-right",
      autoClose:2500
    })
  }


  return (
    <>
      <h1 style={{ textAlign: "center" }}>Firebase 404</h1>
      <form action="" method="post" onSubmit={(e) => submitData(e)}>
        <table border={1} align="center">
          <tr>
            <td>name</td>
            <td>
              <input type="text" name="name" onChange={(e) => getInput(e)} value={record.name?record.name:""}/>
            </td>
          </tr>

          <tr>
            <td>email</td>
            <td>
              <input type="text" name="email" onChange={(e) => getInput(e)} value={record.email?record.email:""}/>
            </td>
          </tr>

          <tr>
            <td></td>
            <td>
              <input type="submit" />
            </td>
          </tr>
        </table>
      </form>

      <br />
      <br />
      <br />

      <table border="1" align="center">
        <thead>
          <tr>
            <th>NO</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => (
            <tr>
              <td>{++i}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                <button onClick={()=> deleteUser(u.id)}>Del</button>
                ||
                <button>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer/>
    </>
  );
}

export default App;
