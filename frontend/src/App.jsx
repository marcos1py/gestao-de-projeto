import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Category from "./pages/Category/Category";
import Navbar from "./pages/Navbar/Navbar.jsx";
import ProjectDetails from "./pages/ProjectDetails/ProjectDetails";
import IssueDetails from "./pages/IssueDetails/IssueDetails";
import { fetchIssuesForUser } from "@/Redux/Issue/Action";

import Subscripton from "./pages/Subscription/Subscripton";
import Auth from "./pages/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUser } from "./Redux/Auth/Action";
import { fetchProjects, fetchCategories, fetchTags } from "./Redux/Project/Action";
import UpgradeSuccess from "./pages/Subscription/UpgradeSuccess";
import AcceptInvitation from "./pages/Project/AcceptInvitation";
import Tags from "./pages/Tags/Tags";
import LoadingScreen from "./components/ui/LoadingScreen";
import DemandasKanban from "./pages/Demandas/DemandasKanban";
import Configuração from "./pages/Configuracao/Configuracao";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  const [loading, setLoading] = useState(true); // Estado para controlar a tela de carregamento

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getUser());
      await dispatch(fetchCategories());
      await dispatch(fetchTags());
      await dispatch(fetchProjects([]));
      await dispatch(fetchIssuesForUser([]));

      setLoading(false); // Define que o carregamento foi concluído
    };

    fetchData();
  }, [auth.jwt, dispatch]);

  // Se ainda está carregando, exibir a tela de loading
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
    { auth.user && auth.user.id ? (
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Configuração" element={<Configuração />} />
            <Route path="/Demandas" element={<DemandasKanban />} />
            <Route path="/category" element={<Category />} />
            <Route path="/tags" element={<Tags />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route
              path="/project/:projectId/issue/:issueId"
              element={<IssueDetails />}
            />
            <Route path="/upgrade_plan" element={<Subscripton />} />
            <Route path="/upgrade_plan/success" element={<UpgradeSuccess />} />
            <Route path="/accept_invitation" element={<AcceptInvitation />} />
          </Routes>
        </div>
      ) : (
        <Auth />
      )}
    </>
  );
}

export default App;
