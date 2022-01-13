import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MyNavBar from './components/layout/MyNavBar'
import Home from './components/home/Home'
import Map from './components/location/Map'
import Calendar from './components/calendar/Calendar'
import CreateDeal from './components/deals/CreateDeal'
import CreateBusiness from './components/business/CreateBusiness'
import DealPage from './components/deals/DealPage'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import NewsHome from './components/news/NewsHome'


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <MyNavBar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/map' component={Map} />
          <Route path='/calendar' component={Calendar} />
          <Route path='/new-deal' component={CreateDeal} />
          <Route path='/new-business' component={CreateBusiness} />
          <Route path='/deals/:id' component={DealPage} />
          <Route path='/sign-in' component={SignIn} />
          <Route path='/sign-up' component={SignUp} />
          <Route path='/news' component={NewsHome} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
