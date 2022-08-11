import React from 'react';
import General from './components/General';
import './reset.css';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      general: {
        firstName: '',
        lastName: '',
        email: '',
      },
    };
  }

  render() {
    const { general } = this.state;
    return (
      <div className="App">
        <nav>
          <h1>CV Generator</h1>
        </nav>

        <div className="main">
          <form onSubmit={(e) => e.preventDefault()}>
            <General info={general} />
          </form>
        </div>
      </div>
    );
  }
}

export default App;
