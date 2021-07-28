import Home from "./pages/home/home";
import Auth from "./pages/Auth";
import { BrowserRouter as Router,Switch,Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
        <Route exact path='/'>
            <Auth/>
          </Route>
          <Route path='/home'>
            <Home/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
export default App;
