import React from 'react';
import { Header } from './Header';
import '../styles/App.css';
import { Main } from './Main';
import { TOKEN_KEY} from "../constants";

class App extends React.Component {
     state = {
         isLoggedIn: Boolean(localStorage.getItem(TOKEN_KEY)),
     }

     handleLogin = (token) => {
         localStorage.setItem(TOKEN_KEY, token);
         this.setState({ isLoggedIn: true});
     }
  render() {
    return (
      <div className="App">
        <Header isLoggedIn={this.state.isLoggedIn}/>
        <Main isLoggedIn={this.state.isLoggedIn} handleLogin={this.handleLogin}/>
      </div>
    );
  }
}


export default App;
