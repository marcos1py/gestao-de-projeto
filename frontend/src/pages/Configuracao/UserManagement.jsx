import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "@/Redux/Auth/Action"; // ajuste o caminho conforme sua estrutura
import AddUserForm from "./AddUserForm";
import { Button } from "@/components/ui/Button";
// Componentes de Dialog (pode ser do Radix UI, Headless UI, ou sua implementação customizada)
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";

const UserManagement = () => {
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);

  // Considerando que o state.users é um array de usuários
  const users = useSelector((state) => state.auth.users) || [];
  console.log("Usuários 1", users);
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div className="p-4">
      
<div className="flex justify-between items-center mb-4">
<h1 className="text-2xl font-bold mb-4">Lista de Usuários</h1>
      <Button onClick={() => setOpenDialog(true)} className="mb-4">
        Adicionar Usuário
      </Button>
</div>

      {openDialog && (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Usuário</DialogTitle>
              <DialogClose onClick={() => setOpenDialog(false)} />
            </DialogHeader>
            <AddUserForm />
          </DialogContent>
        </Dialog>
      )}
      {users.length > 0 ? (
        <ul className="mb-4">
          {users.map((user) => (
            <li key={user.id} className="border p-2 mb-2">
              <p>
                <strong>Nome:</strong> {user.fullName}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum usuário encontrado.</p>
      )}

      
    </div>
  );
};

export default UserManagement;
