import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusIcon } from "@radix-ui/react-icons";
import InviteUserForm from "./InviteUserForm";
import IssueList from "./IssueList";
import ChatBox from "./ChatBox";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProjectById } from "@/Redux/Project/Action";

const ProjectDetails = () => {
  const dispatch = useDispatch();
  const projectDetails = useSelector((store) => store.project.projectDetails);

  const { id } = useParams();

  const handleProjectInvitaton = () => {};

  useEffect(() => {
    dispatch(fetchProjectById(id));
  }, [dispatch, id]);

  return (
    <div className="mt-5 lg:px-10">
      <div className="lg:flex gap-5 justify-between pb-4">
        <ScrollArea className="h-screen lg:w-[69%] pr-2">
          <div className="text-gray-400 pb-10 w-full">
            <h1 className="text-lg font-semibold pb-5">
              {projectDetails?.name}
            </h1>
            <div className="space-y-5 pb-10 text-sm">
              <p className="flex w-full md:max-w-lg lg:max-w-xl ">
              <p className="w-36">Description :</p>
                {projectDetails?.description}
              </p>
              <div className="flex ">
                <p className="w-36">Project Lead :</p>
                <p>{projectDetails?.owner.fullName}</p>
              </div>
              <div className="flex">
                <p className="w-36">Members :</p>
                <div className="flex items-center gap-2">
                  {projectDetails?.team.map((item) => (
                    <Avatar className="cursor-pointer" key={item}>
                      <AvatarFallback>{item.fullName[0]}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>

                <Dialog>
                  <DialogTrigger>
                    <DialogClose>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleProjectInvitaton}
                        className="ml-2"
                      >
                        <span>invite</span>
                        <PlusIcon className="w-3 h-3" />
                      </Button>
                    </DialogClose>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>Invite User</DialogHeader>
                    <InviteUserForm />
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex ">
                <p className="w-36">Category :</p>
                <p>{projectDetails?.category.nome}</p>
              </div>
              <div className="flex ">
                <p className="w-36">Project Lead :</p>
                <Badge>{projectDetails?.owner.fullName}</Badge>
              </div>
            </div>
            <section>
              <p className="py-5 border-b text-lg -tracking-wider">Tasks: </p>
              <div className="lg:flex md:flex gap-3 justify-between py-5 ">
                <IssueList title="Todo List" status="pending" />
                <IssueList title="In progress" status="in_progress" />
                <IssueList title="Done" status="done" />
              </div>
            </section>
          </div>
        </ScrollArea>
        <div className="lg:w-[30%] rounded-md sticky right-5 top-10">
          <ChatBox />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
