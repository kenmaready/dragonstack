import React from 'react';
import { render } from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import history from './history';
import { Router, Switch, Route, Redirect } from 'react-router-dom';

import Root from './components/Root';
import NavBar from './components/NavBar';
import AccountDragons from './components/AccountDragons';
import reducers from './redux/reducers';
import { checkAuthenticated } from './redux/actions';
import './css/main.css';

const store = createStore(
    reducers,
    compose(applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : f => f)
);

const AuthRoute = props => {
    if (!store.getState().account.loggedIn) {
        return <Redirect to={{ pathname: '/'}} />
    }

    const { component, path } = props;
    return <Route path={path} component={component} />;
}


store.dispatch(checkAuthenticated())
    .then(() => {
        render(
            <Provider store={store}>
                <div className="container">
                <hr/>
                    <Router history={history}>
                        <NavBar />
                        <Switch>
                            <Route exact path='/' component={Root} />
                            <AuthRoute path='/account-dragons' component={AccountDragons} />
                        </Switch>
                    </Router>
                </div>
            </Provider>,
            document.getElementById('root')
        );
    });


