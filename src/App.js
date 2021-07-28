import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { BrowserRouter as Router,Switch,Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <Switch>
      <Route exact path='/'>
          <Auth/>
        </Route>
        <Route path='/home'>
          <Home/>
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
