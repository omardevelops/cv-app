import React from 'react';
import Form from './components/Form';
import './reset.css';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      general: [
        {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          summary: '',
        },
      ],
      education: [
        {
          schoolName: '',
        },
        {
          schoolName: '',
        },
      ],
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, key, section, index) {
    console.log(this.state);
    this.setState((state) => {
      const newArr = [...state[section]]; // Get old entries and values
      newArr[index][key] = e.target.value; // Set new value

      const resultObject = {};
      resultObject[section] = newArr;

      return resultObject;
    });
  }

  render() {
    return (
      <div className="App">
        <nav>
          <h1>CV Generator</h1>
        </nav>

        <div className="main">
          <form onSubmit={(e) => e.preventDefault()}>
            <Form info={this.state} handleChange={this.handleChange} />
          </form>
        </div>
      </div>
    );
  }
}

export default App;
