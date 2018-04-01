import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Checkout from './pages/Checkout';
import Nav from './pages/Nav';
import Menu from './pages/Menu';
import Admin from './pages/Admin';

const app = document.getElementById('app');

// Routing to different components is written here
ReactDOM.render(
    <Router>
        <div>
            <Nav />
            <div>
                <Route exact path="/" component={Menu} />
                <Route path="/checkout" component={Checkout} />
                <Route path="/admin" component={Admin} />
            </div>
        </div>
    </Router>,
    app);