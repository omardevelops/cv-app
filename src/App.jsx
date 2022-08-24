import { nanoid } from 'nanoid';
import React from 'react';
import Form from './components/Form';
import CV from './components/CV';
import './reset.css';
import './App.css';
import './CV.css';
import testInfo from './testInfo';

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
            title: '',
            email: '',
            phone: '',
            summary: '',
            id: nanoid(),
          },
        ],
        experience: [],
        education: [],
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

  // Adds a new entry to an input section [education, experience, etc...]
  addToSection = (e, section) => {
    this.setState((state) => {
      const newEntry = { id: nanoid() }; // Create a new entry with its unique ID
      this.keys[section].forEach((key) => {
        // Add the entry's form fields
        newEntry[key] = '';
      });
      const newArr = state.info[section].concat(newEntry);

      const resultObject = {}; // Setup the new state object
      resultObject.info = { ...state.info }; // Fetch old values
      resultObject.info[section] = newArr;

      return resultObject;
    });
  };

  // This function removes an entry from an input section [education, experience, etc...]
  // The entry's unique ID must be provided as an input
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
          {/* Only render form if not submitted. */}
          {/* Only render CV once form is submitted */}
          {/* isFormSubmitted === false */}
          {/* Set to show CV only for now */}
          <Form
            info={info}
            isSubmitted={isFormSubmitted}
            handleSubmission={this.submitForm}
            handleChange={this.handleChange}
            addToSection={this.addToSection}
            removeFromSection={this.removeFromSection}
          />
          {/* {isFormSubmitted === false ? (
            
          ) : (
          )} */}
          <CV info={info} />
        </div>
      </div>
    );
  }
}

export default App;
