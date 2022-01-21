import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/App';
import {Provider} from 'react-redux';
import store from './redux';
import { Switch, Route } from 'react-router-dom';
import { history } from './redux/reducers';
import { ConnectedRouter } from 'connected-react-router';

ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" exact>
            <App />
          </Route>
        </Switch>
      </ConnectedRouter>
    </Provider>,
  document.getElementById('root')
);

