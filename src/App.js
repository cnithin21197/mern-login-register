import './App.css'
import {useState,useEffect} from 'react'
import axios from 'axios'

export default function App() {

    const rootUrl = "https://mern-login-register-api.onrender.com/"

    const [registerNumber,setRegisterNumber] = useState("")
    const [registerPassword,setRegisterPassword] = useState("")
    const [loginNumber,setLoginNumber] = useState("")
    const [loginPassword,setLoginPassword] = useState("")
    const [loginStatus,setLoginStatus] = useState("")

    axios.defaults.withCredentials = true

    function RegisterUser(){
        const url = rootUrl + 'register'
        const postData = {
            number: registerNumber,
            password: registerPassword
        }

        axios.post(url,postData).then((response) => {
            console.log(response.data)
        })
    }

    function LoginUser(){
        const url = rootUrl + 'login'
        const postData = {
            number: loginNumber,
            password: loginPassword
        }

        axios.post(url,postData).then((response) => {
            console.log(response.data)
            setLoginStatus(response.data)
        })
    }

    function CheckLoggedIn(){
        const url = rootUrl + 'login'

        axios.get(url,).then((response) => {
            if(response.data.loggedIn === true){
                setLoginStatus(response.data.user.number)
            }
        })
    }

    useEffect(() => {
        CheckLoggedIn()
    },[])

    return (
        <div className="App">
        <h1>Mern Login Register</h1>
        <h3>Register</h3>
        <input type="text" onChange={(e) => setRegisterNumber(e.target.value)} placeholder='Register Number'/><br /><br />
        <input type="text" onChange={(e) => setRegisterPassword(e.target.value)} placeholder='Register Password'/><br /><br />
        <button onClick={RegisterUser}>Register</button><br />
        <h3>Login</h3>
        <input type="text" onChange={(e) => setLoginNumber(e.target.value)} placeholder='Login Number'/><br /><br />
        <input type="text" onChange={(e) => setLoginPassword(e.target.value)} placeholder='Login Password'/><br /><br />
        <button onClick={LoginUser}>Login</button><br />
        <p>{loginStatus}</p>
        </div>
    )
}