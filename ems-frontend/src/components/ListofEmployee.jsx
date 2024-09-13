import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { listemployee } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';
import { deleteEmployee } from '../services/EmployeeService';

export const ListofEmployee = () => {
  // Initialize emp as an empty array to avoid the error
  const [emp, setEmp] = useState([]);
  const navigateTo = useNavigate();
  const Addbutton = () => navigateTo('/addEmployee');
  

  useEffect(() => {
    getAllEmployees();
}, [])

function getAllEmployees() {
    listemployee().then((response) => {
        setEmp(response.data);
    }).catch(error => {
        console.error(error);
    })
}


function updateEmployee(id) {
    navigateTo(`/edit-employee/${id}`)
}

function removeEmployee(id){
    console.log(id);

    deleteEmployee(id).then((response) =>{
        getAllEmployees();
    }).catch(error => {
        console.error(error);
    })
}

  return (
    <div className='container'>
        <button className='btn btn-secondary mt-2 mb-2' onClick={Addbutton}>
            Add Emplyee
        </button>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Employee First Name</th>
            <th>Employee Last Name</th>
            <th>Employee Email</th>
          </tr>
        </thead>
        <tbody>
          {emp.length > 0 ? (
            emp.map((e) => (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>{e.firstName}</td>
                <td>{e.lastName}</td>
                <td>{e.email}</td>
                <td>
                                <button className='btn btn-info' onClick={() => updateEmployee(e.id)}>Update</button>
                                <button className='btn btn-danger' onClick={() => removeEmployee(e.id)}
                                    style={{marginLeft: '10px'}}
                                >Delete</button>
                            </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No Employees Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
