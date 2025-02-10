import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@radix-ui/react-dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons"; // ícone de 3 pontos
import { FaEdit, FaTrash } from "react-icons/fa"; // ícones de editar e deletar da react-icons
import CreateCategoryForm from "../Category/CreateCategoryForm";

const CategoryList = () => {
  const category = useSelector((store) => store.project.categories || []);

  const handleEdit = (category) => {
    console.log("Edit category:", category);
    // Lógica para editar a categoria
  };

  const handleDelete = (category) => {
    console.log("Delete category:", category);
    // Lógica para deletar a categoria
  };

  return (
    <div className="p-4">
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold mb-4">Lista de Categorias</h1>
          <Dialog>
          <DialogTrigger>
            <Button >Adicionar</Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>Add category</DialogHeader>
            <CreateCategoryForm />
          </DialogContent>

        </Dialog>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Opções</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {category.length > 0 ? (
            category.map((cat, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{cat.nome || 'N/A'}</TableCell> 
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <DotsHorizontalIcon className="w-5 h-5 cursor-pointer" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-slate-700">
                      <DropdownMenuItem onClick={() => handleEdit(cat)}>
                        <div className="m-3">Editar</div>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(cat)}>
                        <div className="m-3">Deletar</div>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                Nenhuma categoria encontrada.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CategoryList;
