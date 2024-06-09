import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import AppRouter from "./routes";
import { store } from "./store";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Navbar />
        <AppRouter />
      </Provider>
    </Router>
  );
}

export default App;
