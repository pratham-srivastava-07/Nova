import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProviders";
import { ModeToggle } from "./buttons/ModeToggle";
import { Button } from "./ui/button";



export default function Navbar() {

    // const {theme, toggleTheme} = useTheme()
    const {isAuthenticated, setIsAuthenticated} = useAuth();
    const navigate = useNavigate()
    function handleLogout() {
        localStorage.removeItem("token")
        setIsAuthenticated(false)
        navigate("/")
    }
    return <div className="border-b border-black p-3 flex justify-between">
        <div className="text-4xl pl-20 font-bold flex items-center">
           Nova  
        </div>
       <div className="flex items-center justify-center space-x-5">
            <div className="text-md font-semibold cursor-pointer flex space-x-3" onClick={()=> {}}>
               {isAuthenticated && <Button variant={"outline"} onClick={handleLogout}>LogOut</Button>}
            </div>
            <div className="pr-5">
                <ModeToggle/>
            </div>
       </div>
    </div>
}