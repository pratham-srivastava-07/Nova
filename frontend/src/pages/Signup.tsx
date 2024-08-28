import { useState } from "react";
import {Input} from "../components/ui/input"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";


export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    async function getData() {
        const res = await axios.post('http://localhost:3000/api/v1/user/signup', {
            email: email,
            password,
            name
        },
    {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        navigate("/")
        localStorage.setItem("token", res.data.token);
    }


    return <div className="flex justify-center pt-40 space-x-10">
        <div className="max-w-6xl  pt-8 flex justify-center items-center ">
            <div className="flex-1 p-4 pl-10">Signup page</div>
            <div className="flex-1">
                <div className="pt-4">
                   <div>
                        <Input placeholder="Name" type="text" onChange={(e:any) => setName(e.target.value)} />
                   </div>
                   <div>
                        <Input placeholder="Email" type="email" onChange={(e:any) => setEmail(e.target.value)} />
                   </div>
                   <div>
                        <Input placeholder="Password" type="password" onChange={(e:any) => setPassword(e.target.value)} />
                   </div>
                </div>
                <div className="pt-4">
                    <Button onClick={getData}>Signup</Button>
                </div>
            </div>
        </div>
    </div>
}