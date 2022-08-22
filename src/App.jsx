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
      info: {
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
      },
      isFormSubmitted: false,
    };
  }

  handleChange = (e, key, section, index) => {
    this.setState((state) => {
      const newArr = [...state.info[section]]; // Get old entries and values
      newArr[index][key] = e.target.value; // Set new value

      const resultObject = {};
      resultObject.info = { ...state.info };
      resultObject.info[section] = newArr;

      return resultObject;
    });
  };

  addToSection = (e, section) => {
    this.setState((state) => {
      const newEntry = { id: nanoid() };
      this.keys[section].forEach((key) => {
        newEntry[key] = '';
      });
      const newArr = state.info[section].concat(newEntry);

      const resultObject = {};
      resultObject.info = { ...state.info };
      resultObject.info[section] = newArr;

      return resultObject;
    });
  };

  removeFromSection = (e, section, id) => {
    this.setState((state) => {
      const newArr = state.info[section].filter((entry) => entry.id !== id);

      const resultObject = {};
      resultObject.info = { ...state.info };
      resultObject.info[section] = newArr;

      return resultObject;
    });
  };

  submitForm = () => {
    this.setState({
      isFormSubmitted: true,
    });
  };

  render() {
    const { info, isFormSubmitted } = this.state;
    return (
      <div className="App">
        <nav>
          <h1>CV Generator</h1>
        </nav>

        <div className="main">
          {isFormSubmitted === false ? (
            <Form
              info={info}
              isSubmitted={isFormSubmitted}
              handleSubmission={this.submitForm}
              handleChange={this.handleChange}
              addToSection={this.addToSection}
              removeFromSection={this.removeFromSection}
            />
          ) : (
            <h1>Submitted</h1>
          )}
        </div>
      </div>
    );
  }
}

export default App;
