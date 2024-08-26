import Input from "../components/Input";

export default function Signup() {
    return <div className="flex justify-center border border-black pt-40 space-x-10">
        <div className="max-w-3xl border border-black">
            Signup Page
        </div>
        <div className="block">
            <Input label="Name" type={"text"} placeholder={"Your Name"} onChange={(e: any) => {}}/>
            <Input label="Email" type={"email"} placeholder={"Your Email"} onChange={(e: any) => {}}/>
            <Input label="Password" type={"password"} placeholder={"Your Password"} onChange={(e: any) => {}}/>
        </div>
    </div>
}