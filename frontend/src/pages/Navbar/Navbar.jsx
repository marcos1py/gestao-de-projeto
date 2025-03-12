import { Button } from "@/components/ui/Button";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { PersonIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/Redux/Auth/Action";

const Navbar = () => {
  const auth = useSelector(store=>store.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = ()=>{
    dispatch(logout())
  }
  return (
    <div className="border-b py-4 px-5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <p onClick={()=>navigate("/")} className="cursor-pointer">GESTAO DE PROJETO</p>
        <Button onClick={()=>navigate("/")} variant="ghost">Home</Button>
        <Button onClick={()=>navigate("/Demandas")} variant="ghost">Demandas</Button>
        <Button onClick={()=>navigate("/Tags")} variant="ghost">Tags</Button>
        <Button onClick={()=>navigate("/Category")} variant="ghost">Categorys</Button>
      </div>

      <div className="flex gap-3 items-center">
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button variant="outline" size="icon" className="rounded-full border-2 border-gray-500">
                    <PersonIcon/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={()=>navigate("/Configuração")}>Configuração</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        <p>{auth.user?.fullName}</p>
      </div>
    </div>
  );
};

export default Navbar;
