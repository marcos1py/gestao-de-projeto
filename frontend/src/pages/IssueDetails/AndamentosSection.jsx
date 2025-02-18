// src/components/Andamentos/AndamentosSection.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScrollArea } from "@/components/ui/scroll-area";
import CreateAndamentoForm from "./CreateAndamentoForm";
import AndamentoCard from "./AndamentoCard";
import { fetchAndamentos } from "@/Redux/Andamento/Action";

const AndamentosSection = ({ issueId }) => {
  const dispatch = useDispatch();
  const { andamentos, loading, error } = useSelector((store) => store.andamento);
 console.log(andamentos.map((item) => (console.log(item))));
  useEffect(() => {
    if (issueId) {
      dispatch(fetchAndamentos(issueId));
    }
  }, [dispatch, issueId]);

  return (
    <div className="p-5 rounded-lg shadow-md">
      <div className="mb-4">
        <CreateAndamentoForm issueId={issueId} />
      </div>

      <div className="space-y-4">
            {andamentos.map((item) => (
              <>
                <AndamentoCard key={item.id} item={item} />
                <br/>
              </>
            ))}
          </div>
    </div>
  );
};

export default AndamentosSection;
