import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import GenerateQRCode from "./Components/generateQRCode/generateQRCode";
import MerchantRegistration from "./components/merchantRegistraion/MerchantRegistration";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/GenerateQRCode" element={<GenerateQRCode />} />
        <Route path="/merchantregistration" element={<MerchantRegistration />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
