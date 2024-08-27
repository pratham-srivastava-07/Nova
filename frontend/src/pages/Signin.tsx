import { useState } from "react";
import PrimaryButton from "../components/buttons/PrimaryButton";
import Input from "../components/Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    async function getData() {
        const res = await axios.post('http://localhost:3000/api/v1/user/signin', {
            email: email,
            password,
        })
        navigate("/")
        localStorage.setItem("token", res.data.token);
    }


    return <div className="flex justify-center pt-40 space-x-10">
        <div className="max-w-6xl  pt-8 flex justify-center items-center ">
            <div className="flex-1 p-4 pl-10">Signup page</div>
            <div className="flex-1">
                <div className="pt-4">
                    <Input label="Email" type={"email"} placeholder={"Your Email"} onChange={(e: any)=> {
                        setEmail(e.target.value);
                    }}></Input>
                    <Input label="Password" type={"password"} placeholder={"Your Password"} onChange={(e: any)=> {
                        setPassword(e.target.value)
                    }}></Input>
                </div>
                <div className="pt-4">
                    <PrimaryButton onClick={getData}>Signin</PrimaryButton>
                </div>
            </div>
        </div>
    </div>
}