import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import UserList from './UserList';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import UpdateDetails from './UpdateDetails';
import { Provider } from 'react-redux';
import store from './redux/store';
import UserForm from './UserForm';
function App() {
  return (
    <div className="App">
      <Provider store={store}>
      <Router>
       <Switch> 
        <Route path="/" exact component={UserList} />   
        <Route path="/User :indexNo Details/" exact component={UpdateDetails} />
        {/* <Route path="/NewForm" exact component={NewuserForm} /> */}
        <Route path="/AddUser" exact component={UserForm} />  
        </Switch>
        </Router>
        </Provider>
    </div>
  );
}

export default App;
