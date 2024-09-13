import React, { useState } from 'react'
import {  createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

export const EmployeeSheet = () => {
    
    const [firstName,setFirstName] = useState();
    const [lastName,setLastName] = useState();
    const [email,setEmail] = useState();
    const navigateTo = useNavigate();
    const {id} = useParams();
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: ''
    })
    useEffect(() => {

        if(id){
            getEmployee(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
            }).catch(error => {
                console.error(error);
            })
        }

    }, [id])

    function saveOrUpdateEmployee(e){
        e.preventDefault();

        if(validateForm()){

            const employee = {firstName, lastName, email}
            console.log(employee)

            if(id){
                updateEmployee(id, employee).then((response) => {
                    console.log(response.data);
                    navigateTo('/');
                }).catch(error => {
                    console.error(error);
                })
            } else {
                createEmployee(employee).then((response) => {
                    console.log(response.data);
                    navigateTo('/')
                }).catch(error => {
                    console.error(error);
                })
            }
        }
    }

    function validateForm(){
        let valid = true;

        const errorsCopy = {... errors}

        if(firstName.trim()){
            errorsCopy.firstName = '';
        } else {
            errorsCopy.firstName = 'First name is required';
            valid = false;
        }

        if(lastName.trim()){
            errorsCopy.lastName = '';
        } else {
            errorsCopy.lastName = 'Last name is required';
            valid = false;
        }

        if(email.trim()){
            errorsCopy.email = '';
        } else {
            errorsCopy.email = 'Email is required';
            valid = false;
        }

        setErrors(errorsCopy);
        
        return valid;

    }
    function pageTitle(){
        if(id){
            return <h2 className='text-center'>Update Employee</h2>
        }else{
            return <h2 className='text-center'>Add Employee</h2>
        }
    }
  
   

  return (
    <div>
        <div className="card text-center">
  <div className="card-body">
  <div className="card-header col-md-6 offset-md-3 offset-md-3">
  {pageTitle()}  
  <div className="card-body">
    <form>
        <div className='form-group mb-2' >
            <label>Enter First Name</label>
            <input
            type='text'
            placeholder='Enter first name'
            name='firstName'
            value={firstName}
            className={`form-control ${ errors.firstName ? 'is-invalid': '' }`}
            onChange={(e) => setFirstName(e.target.value)}
            >
            </input>
            { errors.firstName && <div className='invalid-feedback'> { errors.firstName} </div> }
            </div>
            
            <div className='form-group mb-2' >
            <label>Enter Last Name</label>
            <input
            type='text'
            placeholder='Enter last name'
            name='lastName'
            value={lastName}
            className={`form-control ${ errors.lastName ? 'is-invalid': '' }`}
            onChange={(e) => setLastName(e.target.value)}
            >
            </input>
            { errors.lastName && <div className='invalid-feedback'> { errors.lastName} </div> }
            </div>

            <div className='form-group mb-2' >
            <label>Enter Email </label>
            <input
            type='text'
            placeholder='Enter email'
            name='email'
            value={email}
            className={`form-control ${ errors.email ? 'is-invalid': '' }`}
            onChange={(e) => setEmail(e.target.value)}
            >
            </input>
            { errors.email && <div className='invalid-feedback'> { errors.email} </div> }
            </div>
            
    </form>
    <a href="#" className="btn btn-primary mt-4" onClick={saveOrUpdateEmployee} >Done</a>
  </div>
  </div>
  <div className="card-footer text-muted">
    Employee Management Sysytem
  </div>
</div>
    </div>
    </div>
  )
}
