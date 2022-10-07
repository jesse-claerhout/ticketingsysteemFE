import { CssBaseline, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import { optisTheme } from "./assets/styles/theme";
import NavigationBar from "./pages/navigationBar";
import TicketsOverview from "./pages/ticketsOverview";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Registration } from "./pages/registration";
import { Login } from "./pages/login";
import TicketDetail from "./pages/ticketDetail";
import { defaultUserInfo, UserContext, UserInfo } from "./context/userContext";
import Landing from "./pages/landing";
import OpenTickets from "./pages/openTickets";

function App() {
  const [userInfo, setUserInfo] = useState<UserInfo>(getUserInfo());

  useEffect(() => {
    localStorage.setItem("user-info", JSON.stringify(userInfo));
  }, [userInfo]);

  function getUserInfo(): UserInfo {
    let stored = localStorage.getItem("user-info");
    if (stored == null) return defaultUserInfo;
    else {
      const json = JSON.parse(stored);
      return {
        isAuthenticated: json.isAuthenticated,
        isHandyman: json.isHandyman,
        name: json.name,
      };
    }
  }

  return (
    <ThemeProvider theme={optisTheme}>
      <CssBaseline enableColorScheme />
      <UserContext.Provider value={{ userInfo, setUserInfo }}>
        <Router>
          <main className="container">
            <NavigationBar />
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Registration />} />
              <Route
                path="/my-tickets"
                element={<TicketsOverview showAll={false} />}
              />
              <Route
                path="/tickets"
                element={<TicketsOverview showAll={true} />}
              />
              <Route
              path="/open-tickets"
              element={<OpenTickets/>}
              />
              <Route path="/tickets/:id" element={<TicketDetail />} />
            </Routes>
          </main>
        </Router>
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default App;
