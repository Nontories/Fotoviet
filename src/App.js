import { BrowserRouter } from "react-router-dom";
import UserRouter from "./routers/UserRouter";
import { UserProvider } from "./context/UserContext"

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <UserRouter />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
