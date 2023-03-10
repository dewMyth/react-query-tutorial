import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";

import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { HomePage } from "./components/Home.page";
import RQSuperHeroesPage from "./components/RQSuperHeroes.page";
import { SuperHeroesPage } from "./components/SuperHeroes.page";
import RQSuperhero from "./components/RQSuperhero";
import ParellelQueries from "./components/ParellelQueries";
import DynamicParallelQueries from "./components/DynamicParallelQueries";
import DependendantQueries from "./components/DependendantQueries";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/super-heroes">Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-super-heroes">RQ Super Heroes</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/dependend-queries">
              <DependendantQueries email={"jonhdoe@gmail.com"} />
            </Route>
            <Route path="/parellel-queries/:heroId">
              <DynamicParallelQueries heroIds={[1, 3]} />
            </Route>
            <Route path="/parellel-queries">
              <ParellelQueries />
            </Route>
            <Route path="/super-heroes/:heroId">
              <RQSuperhero />
            </Route>
            <Route path="/super-heroes">
              <SuperHeroesPage />
            </Route>
            <Route path="/rq-super-heroes">
              <RQSuperHeroesPage />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
