import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import ProjectCard from "../Project/ProjectCard";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProjects,
  searchProjects,
  fetchCategories,
  fetchTags,
} from "@/Redux/Project/Action";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateProjectForm from "../Project/CreateProjectForm";
import FilterSection from "./FilterSection";
import { motion, AnimatePresence } from "framer-motion";

const ProjectList = () => {
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();

  const projects = useSelector((store) => store.project.projects || []);
  const searchItems = useSelector(
    (store) => store.project.searchProjects || []
  );
  const tags = useSelector((store) => store.project.tags || []);
  const categories = useSelector((store) => store.project.categories || []);

  const [dateFilter, setDateFilter] = useState({ minDate: "", maxDate: "" });

  const handleFilterDates = ({ minDate, maxDate }) => {
    setDateFilter({ minDate, maxDate });
    dispatch(fetchProjects({ minDate, maxDate }));
  };
  

  // Carrega dados iniciais ao montar o componente
  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchCategories());
    dispatch(fetchTags());
  }, [dispatch]);

  const handleFilterTags = (value) => {
    // Combina os filtros já existentes com o filtro de datas
    dispatch(fetchProjects({ tag: value, ...dateFilter }));
  };

  const handleFilterCategory = (value) => {
    dispatch(fetchProjects({ category: value, ...dateFilter }));
  };

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
    dispatch(searchProjects(e.target.value));
  };

  // Define qual lista de itens exibir (busca ou lista completa)
  const items = keyword ? searchItems : projects;

  return (
    <div className="relative px-5 lg:px-0 lg:flex gap-5 justify-center py-5">
      {/* Componente de Filtros */}
      <FilterSection
        categories={categories}
        tags={tags}
        onFilterCategory={handleFilterCategory}
        onFilterTags={handleFilterTags}
        onFilterDates={handleFilterDates}
      />

      {/* Seção de listagem de projetos */}
      <section className="projectListSection w-full lg:w-[48rem]">
        <div className="flex gap-2 items-center pb-5 justify-between">
          <div className="relative w-full">
            <Input
              onChange={handleSearchChange}
              placeholder="Search project"
              className="w-full px-9"
            />
            <MagnifyingGlassIcon className="absolute top-3 left-4" />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>New Project</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>
                Create a new project by filling out the form below.
              </DialogDescription>
              <CreateProjectForm />
            </DialogContent>
          </Dialog>
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
                <ProjectCard item={item} />
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </section>
    </div>
  );
};

export default ProjectList;
