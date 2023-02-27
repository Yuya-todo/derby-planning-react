import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";

import Home from "./page/Home";
import Listener from "./page/listener/Listener";
import ListenerResult from "./page/listener/ListenerResult";
import Liver from "./page/liver/Liver";
import LiverResult from "./page/liver/LiverResult";
import NewPlanning from "./page/plan/NewPlanning";
import PlanManagement from "./page/plan/PlanManagement";

// import TestAllList from "./page/TestAllList";
// import TestExecution from "./page/TestExecution";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      {/* <Layout> */}

      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/newplanning/*" element={<NewPlanning />} />
        <Route path="/planmanagement/*" element={<PlanManagement />} />
        <Route path="/liver/*" element={<Liver />} />
        <Route path="/liverresult/*" element={<LiverResult />} />
        <Route path="/listener/*" element={<Listener />} />
        <Route path="/listenerresult/*" element={<ListenerResult />} />
      </Routes>
      {/* </Layout> */}
    </BrowserRouter>
  );
};

export default App;
