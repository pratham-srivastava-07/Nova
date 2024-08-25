import { useTheme } from "../providers/ThemProvider";
import NormalButton from "./buttons/NormalButton";


export default function Navbar() {

    const {theme, toggleTheme} = useTheme()
    return <div className="border-b border-black p-3 flex justify-between">
        <div className="text-4xl pl-20 font-bold flex items-center">
           Nova  
        </div>
       <div className="flex items-center justify-center space-x-2">
            <div className="text-md font-semibold cursor-pointer">
                SignOut
            </div>
            <div>
                <NormalButton onClick={toggleTheme}>
                    {theme === 'light' ? '🌙' : '☀️'}
                </NormalButton>
            </div>
       </div>
    </div>
}