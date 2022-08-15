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
        phone: '',
        summary: '',
      },
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, key) {
    this.setState((state) => {
      const newObject = {
        ...state.general,
      };
      newObject[key] = e.target.value;
      return {
        general: {
          ...newObject,
        },
      };
    });
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
            <General generalInfo={general} handleChange={this.handleChange} />
          </form>
        </div>
      </div>
    );
  }
}

export default App;
