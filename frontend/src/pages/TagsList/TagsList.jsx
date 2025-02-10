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
import CreateTagsForm from "../Tags/CreateTagsForm";

const TagsList = () => {
  const tags = useSelector((store) => store.project.tags || []); // Assuming tags is an array of strings

  const handleEdit = (tag) => {
    console.log("Edit tag:", tag);
    // Logic to edit the tag
  };

  const handleDelete = (tag) => {
    console.log("Delete tag:", tag);
    // Logic to delete the tag
  };

  return (
    <div className="p-4">
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold mb-4">Lista de Tags</h1>
          <Dialog>
            <DialogTrigger>
              <Button>Adicionar</Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>Add tags</DialogHeader>
              <CreateTagsForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Opções</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tags.length > 0 ? (
            tags.map((tag, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell> {/* Index as the number */}
                <TableCell>{tag}</TableCell> {/* Directly render the tag string */}
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
    </div>
  );
};

export default TagsList;
