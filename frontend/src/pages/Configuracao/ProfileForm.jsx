import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";

const ProfileForm = ({ fotoPerfil, handleFotoChange }) => {
  return (
    <>
      <h3 className="text-xl font-semibold mb-4">Personalizar Perfil</h3>
      <div className="flex flex-col items-center mb-6">
        <div className="w-24 h-24 rounded-full border overflow-hidden">
          {fotoPerfil ? (
            <img
              src={fotoPerfil}
              alt="Foto de Perfil"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-sm">
              Sem foto
            </div>
          )}
        </div>
        <Input
          type="file"
          accept="image/*"
          onChange={handleFotoChange}
          className="mt-2 w-30"
        />
      </div>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Nome</label>
          <Input placeholder="Digite seu nome" className="w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <Input type="email" placeholder="Digite seu email" className="w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium">Nova Senha</label>
          <Input type="password" placeholder="Digite uma nova senha" className="w-full" />
        </div>
        <div className="flex justify-end">
          <Button type="submit" className="px-4 py-2 border rounded-md">
            Salvar Alterações
          </Button>
        </div>
      </form>
    </>
  );
};

export default ProfileForm;
