import React, { useState, useContext, createContext, useEffect}  from "react";
import 'bootstrap/dist/css/bootstrap.css';
// import { tokenContext } from '../App';
import './test.css'
import {Link, useNavigate} from 'react-router-dom';
import {Form,Button} from 'react-bootstrap';
const options = [
    { value: 'flavor', label: 'flavor' },
    { value: 'yummy', label: 'yummy' },
    { value: 'red', label: 'red' },
    { value: 'green', label: 'green' },
    { value: 'yellow', label: 'yellow' },
];
function AddSlot() {
    return(
        <>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="time" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Form.Select aria-label="Default select example">
                    {options.map(({ value, label }, index) => <option value={value} >{label}</option>)}
                </Form.Select>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    );
}
export default AddSlot;