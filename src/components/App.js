import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import SignUp from './Auth/SignUp';
import Login from './Auth/Login';
import { AuthProvider } from "../contexts/AuthContext";
import PrivateRoute from "./PrivateRoute";

const Home = () => {

  return (
    <h1>Henlo World</h1>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
        </Switch>
      </AuthProvider>
    </Router>
  )
}

export default App;
