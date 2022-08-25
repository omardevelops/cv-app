import React from 'react';
import { nanoid } from 'nanoid';
import Swal from 'sweetalert2';
import Form from './components/Form';
import CV from './components/CV';
import './reset.css';
import './App.css';
import './CV.css';
import initialInfo from './initialInfo';

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
      info: initialInfo,
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

  handleClear = async () => {
    const result = await Swal.fire({
      title: 'Clear Form: Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      focusCancel: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, clear it!',
    });
    if (result.isConfirmed) {
      this.setState({
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
          education: [],
          experience: [],
        },
      });
    }
  };

  // Resets info to sample info
  handleReset = async () => {
    const result = await Swal.fire({
      title: 'Reset Form:\n Are you sure?',
      text: "Form will be filled out with sample data. Your own data will be cleared. You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      focusCancel: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, reset it!',
    });
    if (result.isConfirmed) {
      this.setState({
        info: initialInfo,
      });
    }
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
            handleClear={this.handleClear}
            handleReset={this.handleReset}
            addToSection={this.addToSection}
            removeFromSection={this.removeFromSection}
          />
          <CV info={info} />
        </div>
      </div>
    );
  }
}

export default App;
