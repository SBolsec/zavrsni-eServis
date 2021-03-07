import { BrowserRouter, Switch } from 'react-router-dom';
import routes from './routes';
import RenderRoute from './RenderRoute';

function App() {

  return (
    <BrowserRouter>
      <Switch>
        {routes.map((route, index) => (
          <RenderRoute {...route} key={index} />
        ))}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
