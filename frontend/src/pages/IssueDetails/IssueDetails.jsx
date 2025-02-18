// src/components/Issue/IssueDetails.jsx
import { ScrollArea } from "@/components/ui/scroll-area";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchIssueById, updateIssueStatus } from "@/Redux/Issue/Action";
import { fetchAndamentos } from "@/Redux/Andamento/Action";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import AndamentosSection from "./AndamentosSection"; // Componente dedicado para andamentos

const IssueDetails = () => {
  const { projectId, issueId } = useParams();
  const dispatch = useDispatch();
  const { issues } = useSelector((store) => store.issue); // Seu reducer está sob a chave "issue"
  
  useEffect(() => {
    dispatch(fetchIssueById(issueId));
    dispatch(fetchAndamentos(issueId));
  }, [issueId, dispatch]);

  // Considerando que fetchIssueById retorna uma issue única
  const issue = issues; 

  return (
    <div className="px-20 py-8 text-gray-400  min-h-screen">
      <div className="flex flex-col lg:flex-row gap-10 border p-10 rounded-lg ">
        {/* Coluna Esquerda: Detalhes da Demanda e Andamentos */}
        <div className="flex-1">
          <ScrollArea className="h-[80vh]">
            <div>
              <h1 className="text-2xl font-bold mb-4">{issue?.title}</h1>
              <p className="text-gray-400 mb-6">{issue?.description}</p>
              {/* Seção de Andamentos */}
              <AndamentosSection issueId={issueId} />
            </div>
          </ScrollArea>
        </div>
        {/* Coluna Direita: Informações Complementares */}
        <div className="w-full lg:w-[30%] space-y-4">
          <div className="border rounded-lg p-5 ">
            <h2 className="text-xl font-semibold border-b pb-2 mb-4">Detalhes</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Assignee:</span>
                {issue?.assignee ? (
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{issue.assignee.fullName[0]}</AvatarFallback>
                    </Avatar>
                    <span>{issue.assignee.fullName}</span>
                  </div>
                ) : (
                  <span>unassigned</span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Status:</span>
                <Badge>{issue?.status}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Data Criação:</span>
                <span>
                  {issue?.createdAt &&
                    new Date(issue.createdAt).toLocaleString("pt-BR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Reporter:</span>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>R</AvatarFallback>
                  </Avatar>
                  <span>Ram</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetails;
