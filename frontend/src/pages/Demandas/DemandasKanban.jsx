import { useState, useEffect, useMemo } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import IssueCard from "../Issue/IssueCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchIssuesForUser, updateIssueStatus } from "@/Redux/Issue/Action";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const DemandasKanban = () => {
  const dispatch = useDispatch();
  const reduxIssues = useSelector((store) => store.issue.issues || []);

  const [searchQuery, setSearchQuery] = useState("");
  const [columns, setColumns] = useState({
    pending: { name: "Pending", items: [] },
    in_progress: { name: "In Progress", items: [] },
    done: { name: "Done", items: [] },
  });

  // Carrega as issues do usuário ao montar o componente
  useEffect(() => {
    dispatch(fetchIssuesForUser());
  }, [dispatch]);

  // Memoriza o array filtrado para evitar recriações desnecessárias
  const filteredIssues = useMemo(() => {
    return reduxIssues.filter((issue) =>
      issue.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [reduxIssues, searchQuery]);

  // Agrupa as issues filtradas por status para popular as colunas
  useEffect(() => {
    const pending = filteredIssues.filter(
      (issue) => issue.status === "pending"
    );
    const inProgress = filteredIssues.filter(
      (issue) => issue.status === "in_progress"
    );
    const done = filteredIssues.filter((issue) => issue.status === "done");
    setColumns({
      pending: { name: "Pending", items: pending },
      in_progress: { name: "In Progress", items: inProgress },
      done: { name: "Done", items: done },
    });
  }, [filteredIssues]);

  // Função chamada ao terminar de arrastar
  // Função chamada ao terminar de arrastar
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId === destination.droppableId) {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: { ...column, items: copiedItems },
      });
    } else {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      // Cria uma nova cópia do objeto com o status atualizado
      const updatedRemoved = { ...removed, status: destination.droppableId };
      destItems.splice(destination.index, 0, updatedRemoved);
      setColumns({
        ...columns,
        [source.droppableId]: { ...sourceColumn, items: sourceItems },
        [destination.droppableId]: { ...destColumn, items: destItems },
      });
      // Atualiza o status no backend
      dispatch(
        updateIssueStatus({ id: removed.id, status: destination.droppableId })
      );
    }
  };

  return (
    <div className="p-5 min-h-screen flex flex-col">
      {/* Campo de busca */}
      <div className="mb-5 flex justify-center">
        <Input
          type="text"
          placeholder="Buscar demanda..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border  text-slate-300 rounded px-3 py-2 w-full max-w-md"
        />
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-5 flex-1 overflow-auto">
          {Object.entries(columns).map(([columnId, column]) => (
            <Card key={columnId} className="flex flex-col p-5 flex-1">
              <h2 className="text-xl font-bold mb-4 text-center">
                {column.name}
              </h2>
              <Droppable droppableId={columnId}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`p-2 rounded transition-colors ${
                      snapshot.isDraggingOver ? "bg-gray-700" : ""
                    }`}
                    style={{ height: "700px", overflowY: "auto" }}
                  >
                    {column.items.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={String(item.id)}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`mb-3 ${
                              snapshot.isDragging ? "bg-gray-700" : ""
                            }`}
                          >
                            <IssueCard issue={item} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Card>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default DemandasKanban;
