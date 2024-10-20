import {Button, Form} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import Cookies from 'universal-cookie';

import FloatingLabel from "react-bootstrap/FloatingLabel";

import '../App.css';

function Messages() {
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const [returnedData, setReturnedData] = useState({
        _id: "", 
        username: "", 
        password: "", 
        email: "", 
        firstname: "", 
        lastname: ""
    });


    useEffect(() => {
        const loggedInUser = document.cookie.split('=')[1];
        console.log(loggedInUser);
        if (loggedInUser) {
            console.log("User is logged in");
            decodeJWT(loggedInUser);
        } else {
            console.log("No user is logged in");
            navigate("/LogIn", {relative: "path"})
        }
        console.log(loggedInUser);
    }, []);

    const handleChange = (event) => {
        const {name, value} = event.target;

        setCredentials(prev => {
            return {
                ...prev,
                [name]: value,
            }
        });
    }

    const cookies = new Cookies();
    
    const decodeJWT = async (token) => {
        console.log("token: ", token)
        const tokenData = await fetch('http://localhost:3001/decodeJWT', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                Token: token
            })
        })
        .then(res => res.json());

        console.log(tokenData);
    }

    return (
        <>
            <div id='bodyTest' style={{width:"100%", margin:"auto auto", textAlign:"center"}}>
                <h2>Messages</h2>
            </div>
        </>
    )

}

export default Messages