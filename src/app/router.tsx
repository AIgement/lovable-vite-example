import { Route, Routes } from "react-router-dom";
import AboutPage from "@pages/AboutPage";
import ErrorPage from "@pages/ErrorPage";
import HomePage from "@pages/HomePage";
import NotFoundPage from "@pages/NotFoundPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/error" element={<ErrorPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;
