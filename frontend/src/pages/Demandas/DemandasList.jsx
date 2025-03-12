import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import IssueCard from "../Issue/IssueCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchIssuesForUser, searchIssues } from "@/Redux/Issue/Action";
import FilterSectionDemandas from "./FilterSectionDemandas";
import { motion, AnimatePresence } from "framer-motion";
import store from "@/Redux/Store";
import { Input } from "@/components/ui/input";

const DemandasList = () => {
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();

  // Como o reducer de issues está registrado com a chave "issue", use "store.issue.issues"
  const issues = useSelector((store) => store.issue.issues || []);
  //console.log(store.issue);
  const searchItems = useSelector((store) => store.issue.searchIssues || []);
  const [dateFilter, setDateFilter] = useState({ minDate: "", maxDate: "" });
  const handleFilterDates = ({ minDate, maxDate }) => {
    setDateFilter({ minDate, maxDate });
    dispatch(fetchIssuesForUser({ minDate, maxDate }));
  };

  // Carrega dados iniciais ao montar o componente
  useEffect(() => {
    dispatch(fetchIssuesForUser());
  }, [dispatch]);
  

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
    dispatch(searchIssues(e.target.value));
  };

  const items = keyword ? searchItems : issues;

  return (
    <div className="relative px-5 lg:px-0 lg:flex gap-5 justify-center py-5">
      {/* Componente de Filtros para Demandas */}
      <FilterSectionDemandas onFilterDates={handleFilterDates} />

      {/* Seção de listagem de demandas */}
      <section className="demandasListSection w-full lg:w-[48rem]">
        <div className="flex gap-2 items-center pb-5 justify-between">
            <div className="relative w-full">
            <Input
              onChange={handleSearchChange}
              placeholder="Search project"
              className="w-full px-9"bus
            />
            <MagnifyingGlassIcon className="absolute top-3 left-4" />
          </div>
        </div>

        {/* Lista com animação */}
        <AnimatePresence>
          <div className="space-y-5 min-h-[74vh]">
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <IssueCard issue={item} />
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </section>
    </div>
  );
};

export default DemandasList;
