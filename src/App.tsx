import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../src/pages/home/page";
import AIChatBotPage from "../src/pages/aichatbot/page";
import ContactPage from "../src/pages/contact/page";
import ForecastPage from "../src/pages/forecast/page";
import HeatmapPage from "../src/pages/heatmap/page";
import ErrorPage from "./pages/error/page";


export default function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="aichatbot" element={<AIChatBotPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="forecast" element={<ForecastPage />} />
          <Route path="heatmap" element={<HeatmapPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
};
