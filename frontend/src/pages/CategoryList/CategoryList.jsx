import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import CreateCategoryForm from "../Category/CreateCategoryForm";
import EditCategoryForm from "../Category/EditCategoryForm";
import { deleteCategory } from "@/Redux/Project/Action"; // importe a ação de deleção

const CategoryList = () => {
  const dispatch = useDispatch();
  const categories = useSelector((store) => store.project.categories || []);
  const [editCategory, setEditCategory] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleEdit = (cat) => {
    setEditCategory(cat);
    setIsEditDialogOpen(true);
  };

  const handleDelete = async (cat) => {
    dispatch(deleteCategory(cat.id));
    dispatch(fetchCategories());
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold mb-4">Lista de Categorias</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger>
            <Button onClick={() => setIsAddDialogOpen(true)}>Adicionar</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>Add category</DialogHeader>
            <CreateCategoryForm onClose={() => setIsAddDialogOpen(false)} />
          </DialogContent>
        </Dialog>
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
          {categories.length > 0 ? (
            categories.map((cat, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{cat.nome || "N/A"}</TableCell>
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

      {/* Diálogo para Edição – sempre renderizado e controlado pela prop "open" */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>Editar Categoria</DialogHeader>
          {editCategory && (
            <EditCategoryForm
              category={editCategory}
              onClose={() => setIsEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CategoryList;
