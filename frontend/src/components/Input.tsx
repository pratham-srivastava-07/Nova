
interface InputInterface {
    label: string,
    placeholder: string,
    onChange: (e: any) => void
    type?:  "text" | "password" | "email"
}

export default function Input({label, placeholder, onChange, type = "text"}: InputInterface) {
    return <div className="">
        <div className="text-sm pt-2 pb-1">
          * <label >{label}</label>
        </div>
        <input className="border rounded px-4 py-2 w-full border-black" type={type} placeholder={placeholder} onChange={onChange} />
    </div>
}