import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';

import Home from './Pages/Home/Home';
import Movies from './Pages/Movies/Movies';
import Tv from './Pages/Tv/Tv';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Logout from './Pages/Logout/Logout';
import Footer from './Components/Footer/Footer';
import NotFound from './Pages/NotFound/NotFound';
import ProtectedRoute from './Components/ProtecedRoute/ProtectedRoute';
import People from './Pages/People/People';
import Search from './Pages/Search/Search';
import CheckToken from './Components/CheckToken/CheckToken';
import aboutMovie from './Pages/About/aboutMovie';
import aboutTv from './Pages/About/aboutTv';
import aboutPerson from './Pages/About/aboutPerson.jsx';
import SeasonData from './Components/Tv Seasons/SeasonData';
import Episode from './Components/Tv Seasons/Episode';

export default class App extends Component {

  render() {
    return (
      <>
        <Switch>

          <ProtectedRoute path="/home" component={Home} />

          <ProtectedRoute path="/movies" component={Movies} />
          <ProtectedRoute path="/series" component={Tv} />
          <ProtectedRoute path="/actors" component={People} />

          <ProtectedRoute path="/search" component={Search} />

          <ProtectedRoute path="/aboutMovie" component={aboutMovie} />
          <ProtectedRoute path="/aboutTv" component={aboutTv} />
          <ProtectedRoute path="/aboutPerson" component={aboutPerson} />

          <ProtectedRoute path="/season" component={SeasonData} />
          <ProtectedRoute path="/episode" component={Episode} />

          <CheckToken path="/login" component={Login} />
          <CheckToken path="/register" component={Register} />

          <Route path="/logout" component={Logout} />

          <Redirect exact from="/" to="/login" state={null} />
          <ProtectedRoute path="*" component={NotFound} />

        </Switch>

        <Footer />
      </>
    )
  }
}
