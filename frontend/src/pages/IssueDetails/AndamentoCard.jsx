import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { deleteAndamento } from "@/Redux/Andamento/Action";
import { TrashIcon } from "@radix-ui/react-icons";
import { useDispatch } from "react-redux";

const AndamentoCard = ({ item }) => {
  const dispatch = useDispatch();

  const handleDeleteAndamento = () => {
    dispatch(deleteAndamento(item.id));
  };

  return (
    <div className="">
      <br />  
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarFallback>{item.user.fullName[0]}</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <p>{item.user.fullName}</p>
          {/* Renderiza o conteúdo como HTML */}
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: item.content }}
          />
        </div>
        <Button
          onClick={handleDeleteAndamento}
          className="rounded-full"
          variant="ghost"
          size="icon"
        >
          <TrashIcon />
        </Button>
      </div>
    </div>
  );
};

export default AndamentoCard;
