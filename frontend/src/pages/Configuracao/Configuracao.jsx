import { useState } from "react";
import SidebarConfiguracao from "./SidebarConfiguracao";
import ProfileForm from "./ProfileForm";
import UserManagement from "./UserManagement";

const Configuracao = () => {
  const [modo, setModo] = useState("perfil"); // "perfil" ou "add"
  const [fotoPerfil, setFotoPerfil] = useState(null);

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoPerfil(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex min-h-screen">
      <SidebarConfiguracao modo={modo} setModo={setModo} />
      <div className="flex-1 p-8">
        {modo === "perfil" && (
          <ProfileForm fotoPerfil={fotoPerfil} handleFotoChange={handleFotoChange} />
        )}
        {modo === "add" && <UserManagement />}
      </div>
    </div>
  );
};

export default Configuracao;
