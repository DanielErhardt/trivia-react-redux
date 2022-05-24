// import React from 'react';
// import { Switch, Route } from 'react-router-dom';
// import Login from './pages/Login';
// import Wallet from './pages/Wallet';

// class App extends React.Component {
//   render() {
//     return (
//       <Switch>
//         <Route exact path="/" component={ Login } />
//         <Route exact path="/carteira" component={ Wallet } />
//       </Switch>
//     );
//   }
// }

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
      </Switch>
    </div>
  );
}
