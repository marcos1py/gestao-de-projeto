import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {  assignIssueToUser } from "@/Redux/Issue/Action";
import { useDispatch, useSelector } from "react-redux";

const UserList = ({ issueDetails }) => {
  const projectDetails = useSelector((store) => store.project.projectDetails);
  const dispatch = useDispatch();
  const handleAssignIssueToUser = (userId) => {
    dispatch(assignIssueToUser({issueId:issueDetails.id,userId}));
  };
  return (
    <>
      <div className="space-y-2">
        <div className="border rounded-md">
          <p className="py-2 px-3"> {issueDetails.assignee?.fullName || "Unassignee"} </p>
        </div>
        {projectDetails?.team.map((item) => (
          <div onClick={()=>handleAssignIssueToUser(item.id)}
            key={10}
            className="py-2 group hover:bg-slate-800 cursor-pointer flex items-center space-x-4 rounded-md border px-4"
          >
            <Avatar>
              <AvatarFallback>{item.fullName[0]}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <p className="text-sm leading-none">{item.fullName}</p>
              <p className="text-sm text-muted-foreground">
                @{item.fullName.toLowerCase()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserList;
