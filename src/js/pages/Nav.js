import React from 'react';
import Menu from './Menu';
import { Link } from 'react-router-dom'

class Nav extends React.Component {


    render() {
        return (
            <div>
                <nav class="navbar navbar-default">
                    <div class="container-fluid">
                        <div class="navbar-header">
                            <Link class="navbar-brand" to="/">Fred's Kitchen</Link>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}


export default Nav;