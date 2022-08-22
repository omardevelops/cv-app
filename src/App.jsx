import { nanoid } from 'nanoid';
import React from 'react';
import Form from './components/Form';
import './reset.css';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.keys = {
      education: [
        'institutionName',
        'titleOfStudy',
        'GPA',
        'startDate',
        'endDate',
      ],
      experience: [
        'companyName',
        'positionTitle',
        'mainTasks',
        'startDate',
        'endDate',
      ],
    };

    this.state = {
      general: [
        {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          summary: '',
          id: nanoid(),
        },
      ],
      education: [],
      experience: [],
    };

    // this.handleChange = this.handleChange.bind(this);
    // this.addToSection = this.addToSection.bind(this);
    // this.removeFromSection = this.removeFromSection.bind(this);
  }

  handleChange = (e, key, section, index) => {
    this.setState((state) => {
      const newArr = [...state[section]]; // Get old entries and values
      newArr[index][key] = e.target.value; // Set new value

      const resultObject = {};
      resultObject[section] = newArr;

      return resultObject;
    });
  };

  addToSection = (e, section) => {
    this.setState((state) => {
      const newEntry = { id: nanoid() };
      this.keys[section].forEach((key) => {
        newEntry[key] = '';
      });
      const newArr = state[section].concat(newEntry);

      const resultObject = {};
      resultObject[section] = newArr;

      return resultObject;
    });
  };

  removeFromSection = (e, section, id) => {
    console.log(`remove ${section} id: ${id}`);
    this.setState((state) => {
      const newArr = state[section].filter((entry) => entry.id !== id);

      const resultObject = {};
      resultObject[section] = newArr;

      return resultObject;
    });
  };

  render() {
    return (
      <div className="App">
        <nav>
          <h1>CV Generator</h1>
        </nav>

        <div className="main">
          <Form
            info={this.state}
            handleChange={this.handleChange}
            addToSection={this.addToSection}
            removeFromSection={this.removeFromSection}
          />
        </div>
      </div>
    );
  }
}

export default App;
