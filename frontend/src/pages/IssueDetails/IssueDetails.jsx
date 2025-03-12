// src/components/Issue/IssueDetails.jsx
import { ScrollArea } from "@/components/ui/scroll-area";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { fetchIssueById } from "@/Redux/Issue/Action";
import { fetchAndamentos } from "@/Redux/Andamento/Action";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import AndamentosSection from "./AndamentosSection";
import { Button } from "@/components/ui/Button"; // Supondo que exista um componente Button

const IssueDetails = () => {
  const { projectId, issueId } = useParams();
  const dispatch = useDispatch();
  const { issues } = useSelector((store) => store.issue);

  // Estado para controlar se o timer está ativo
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  // Estado para o tempo acumulado do ciclo atual (em milissegundos)
  const [currentElapsed, setCurrentElapsed] = useState(0);
  // Array de registros de tempo (cada um é um ciclo de start/stop)
  const [records, setRecords] = useState([]);

  const timerInterval = useRef(null);
  const startTimestamp = useRef(null);

  useEffect(() => {
    dispatch(fetchIssueById(issueId));
    dispatch(fetchAndamentos(issueId));
  }, [issueId, dispatch]);

  const issue = issues;

  // Função para formatar milissegundos para hh:mm:ss
  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  // Inicia um novo ciclo
  const startTimer = () => {
    startTimestamp.current = Date.now();
    setIsTimerRunning(true);
    // Atualiza o tempo a cada segundo
    timerInterval.current = setInterval(() => {
      setCurrentElapsed(Date.now() - startTimestamp.current);
    }, 1000);
  };

  // Para o ciclo atual e registra os dados
  const stopTimer = () => {
    clearInterval(timerInterval.current);
    setIsTimerRunning(false);
    const sessionElapsed = Date.now() - startTimestamp.current;
    // Registra o ciclo atual com a data de início e o tempo gasto
    setRecords((prevRecords) => [
      ...prevRecords,
      { date: new Date(startTimestamp.current), elapsed: sessionElapsed },
    ]);
    // Reseta o contador do ciclo atual
    setCurrentElapsed(0);
  };

  // Alterna entre iniciar e parar
  const handleToggleTimer = () => {
    if (isTimerRunning) {
      stopTimer();
    } else {
      startTimer();
    }
  };

  return (
    <div className="px-20 py-8 text-gray-400 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-10 border p-10 rounded-lg">
        {/* Coluna Esquerda: Detalhes da Demanda e Andamentos */}
        <div className="flex-1">
          <ScrollArea className="h-[80vh]">
            <div>
              <h1 className="text-2xl font-bold mb-4">{issue?.title}</h1>
              <p className="text-gray-400 mb-6">{issue?.description}</p>
              <AndamentosSection issueId={issueId} />
            </div>
          </ScrollArea>
        </div>
        {/* Coluna Direita: Informações Complementares */}
        <div className="w-full lg:w-[30%] space-y-4">
          <div className="border rounded-lg p-5">
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

            </div>
            {/* Botão para iniciar/parar a contagem */}
            <div className="mt-4">
              <Button onClick={handleToggleTimer} className="w-full">
                {isTimerRunning ? "Parar" : "Iniciar"}
              </Button>
              {/* Exibe o tempo do ciclo atual se estiver em execução */}
              {isTimerRunning && (
                <p className="mt-2 text-sm">Tempo atual: {formatTime(currentElapsed)}</p>
              )}
            </div>
            {/* Lista de registros */}
            {records.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Histórico de tempos:</h3>
                <ul className="space-y-1 text-sm">
                  {records.map((record, index) => (
                    <li key={index} className="border-b pb-1">
                      <span>
                        {record.date.toLocaleString("pt-BR", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      {" - "}
                      <span>{formatTime(record.elapsed)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetails;
