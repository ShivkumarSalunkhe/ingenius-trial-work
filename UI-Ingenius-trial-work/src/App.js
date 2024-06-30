import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import SubscriptionPlans from "./components/Subscription/SubscriptionPlans";
import { Provider } from "react-redux";
import store from "./components/redux/store";
import { ToastContextProvider } from "./components/Context/ToastContext";
import Cookies from "js-cookie";
import Home from "./components/Home";
import MyProfile from "./components/MyProfile";

function App() {

  return (
    <ToastContextProvider>
      <BrowserRouter>
        <Provider store={store}>
          <div className="App">
            <Routes>
              <Route path="/" element={<Auth />} />

              <Route path="/home" element={<Home />} />
              <Route
                path="/subscription-plans"
                element={<SubscriptionPlans />}
              />
              <Route
                path="/subscription-plans/:method/:planId"
                element={<SubscriptionPlans />}
              />
              <Route path="/my-profile" element={<MyProfile />} />
            </Routes>
          </div>
        </Provider>
      </BrowserRouter>
    </ToastContextProvider>
  );
}

export default App;
