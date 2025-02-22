import React from "react";

const SidebarConfiguracao = ({ modo, setModo }) => {
  return (
    <div className="w-64 p-8 border-r border-gray-200">
      <button
        onClick={() => setModo("perfil")}
        className={`block w-full mb-2 px-4 py-2 rounded-md ${
          modo === "perfil"
            ? "font-semibold underline underline-offset-2 decoration-2 decoration-gray-500"
            : ""
        }`}
      >
        Personalizar Perfil
      </button>
      <button
        onClick={() => setModo("add")}
        className={`block w-full mb-2 px-4 py-2 rounded-md ${
          modo === "add"
            ? "font-semibold underline underline-offset-2 decoration-2 decoration-gray-500"
            : ""
        }`}
      >
        Adicionar Usuário
      </button>
    </div>
  );
};

export default SidebarConfiguracao;
