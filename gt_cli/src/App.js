import { Routes, Route } from "react-router-dom";
import BaseLayout from "./pages/layout.pages";
import Auth from "./pages/auth.pages";
import useVerify from "./modules/auth/hooks/verify.hooks";
import TasksPage from "./modules/tasks";
import Welcome from "./modules/home";

function App() {
  useVerify();
  return (
    <Routes>
      <Route path="/auth" element={<Auth />}></Route>
      <Route path="/auth/register" element={<Auth />}></Route>
      <Route path="/" element={<BaseLayout />}>
        <Route path="" element={<Welcome />} />
        <Route path="tasks" element={<TasksPage />} />
      </Route>
    </Routes>
  );
}

export default App;
