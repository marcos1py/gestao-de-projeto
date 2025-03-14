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
import CreateTagsForm from "../Tags/CreateTagsForm";
import EditTagsForm from "../Tags/EditCategoryForm";
import { deleteTags, fetchTags } from "@/Redux/Project/Action";

const TagsList = () => {
  const dispatch = useDispatch();
  // Seleciona as tags do state; certifique-se que no reducer você armazena em store.project.tags
  const tags = useSelector((state) => state.project.tags);
  const [editTag, setEditTag] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleEdit = (tag) => {
    setEditTag(tag);
    setIsEditDialogOpen(true);
  };

  const handleDelete = async (tag) => {
    try {
      await dispatch(deleteTags(tag.id)).unwrap();
      // Atualiza a lista de tags após a deleção
      await dispatch(fetchTags());
    } catch (error) {
      console.error("Erro ao deletar tag:", error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold mb-4">Lista de Tags</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger>
            <Button onClick={() => setIsAddDialogOpen(true)}>Adicionar</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>Add Tag</DialogHeader>
            <CreateTagsForm onClose={() => setIsAddDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Tag</TableHead>
            <TableHead>Opções</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tags.length > 0 ? (
            tags.map((tag, index) => (
              <TableRow key={tag.id || index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{tag.nome || "N/A"}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <DotsHorizontalIcon className="w-5 h-5 cursor-pointer" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-slate-700">
                      <DropdownMenuItem onClick={() => handleEdit(tag)}>
                        <div className="m-3">Editar</div>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(tag)}>
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
                Nenhuma tag encontrada.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Diálogo para edição de tag */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>Editar Tag</DialogHeader>
          {editTag && (
            <EditTagsForm
              tag={editTag}
              onClose={() => setIsEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TagsList;
