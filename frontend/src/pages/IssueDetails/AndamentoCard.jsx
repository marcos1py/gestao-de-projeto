import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/Button";
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
      <div className="">
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarFallback>{item.user.fullName[0]}</AvatarFallback>
          </Avatar>
          <b>{item.user.fullName}</b>
          <br />
        </div>

        <div className="flex items-center justify-between">
  <div
    className="prose max-w-none"
    dangerouslySetInnerHTML={{ __html: item.content }}
  />
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
    </div>
  );
};

export default AndamentoCard;
