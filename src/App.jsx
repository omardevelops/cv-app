import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import Swal from 'sweetalert2';
import ReactToPrint from 'react-to-print';
import Form from './components/Form';
import CV from './components/CV';
import './reset.css';
import './App.css';
import './CV.css';
import initialInfo from './initialInfo';

const generatePrintBtn = () => {
  console.log('hi');
  return (
    <button type="button" className="print">
      Print
    </button>
  );
};

function App() {
  const [info, setInfo] = useState(initialInfo);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const keys = {
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

  const handleChange = (e, key, section, index) => {
    console.log(info);
    const newArr = [...info[section]]; // Get old entries and values
    newArr[index][key] = e.target.value; // Set new value

    const result = { ...info };
    result[section] = newArr;

    setInfo(result);
  };

  // Adds a new entry to an input section [education, experience, etc...]
  const addToSection = (e, section) => {
    const newEntry = { id: nanoid() }; // Create a new entry with its unique ID
    keys[section].forEach((key) => {
      // Add the entry's form fields
      newEntry[key] = '';
    });
    const newArr = info[section].concat(newEntry);

    const result = { ...info }; // Fetch old values
    result[section] = newArr;

    setInfo(result);
  };

  // This function removes an entry from an input section [education, experience, etc...]
  // The entry's unique ID must be provided as an input
  const removeFromSection = async (e, section, index, id) => {
    const entryToRemove = info[section][index];
    let msg = '';
    if (section === 'education') {
      msg = `Title: ${entryToRemove.titleOfStudy}<br>Institution: ${entryToRemove.institutionName}`;
    } else if (section === 'experience') {
      msg = `Title: ${entryToRemove.positionTitle}<br>Company: ${entryToRemove.companyName}`;
    }

    const prompt = await Swal.fire({
      title: `Removing ${
        section[0].toUpperCase() + section.slice(1, section.length)
      } Entry #${index + 1}\n Are you sure?`,
      html: `${msg}<br><br>You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      focusCancel: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, clear it!',
    });
    if (prompt.isConfirmed) {
      const newArr = info[section].filter((entry) => entry.id !== id);

      const result = { ...info }; // Fetch old values
      result[section] = newArr;

      setInfo(result);
    }
  };

  const moveUpInSection = (e, index, section) => {
    const { info } = this.state;
    const { length } = info[section];

    // Section must have at least two items, item should not be the first one
    if (length > 1 && index !== 0) {
      this.setState((state) => {
        // Get item to move (as array with 1 element)
        const itemToMove = state.info[section].filter((item, i) => i === index);
        // Get new array without that item
        const newArr = state.info[section].filter((item, i) => i !== index);
        // Mutate new array with the MOVED UP item (index - 1)
        newArr.splice(index - 1, 0, ...itemToMove);

        // Prepare and return the resulting info state obj
        const resultObject = {};
        resultObject.info = { ...state.info };
        resultObject.info[section] = newArr;

        return resultObject;
      });
    }
  };

  const moveDownInSection = (e, index, section) => {
    const { info } = this.state;
    const { length } = info[section];

    // Section must have at least two items, item should not be the last one
    if (length > 1 && index < length - 1) {
      this.setState((state) => {
        // Get item to move
        const itemToMove = state.info[section].filter((item, i) => i === index);
        // Get new array without that item
        const newArr = state.info[section].filter((item, i) => i !== index);
        // Mutate new array with the MOVED DOWN item (index + 1)
        newArr.splice(index + 1, 0, ...itemToMove);

        // Prepare and return the resulting info state obj
        const resultObject = {};
        resultObject.info = { ...state.info };
        resultObject.info[section] = newArr;

        return resultObject;
      });
    }
  };

  const submitForm = () => {
    this.setState({
      isFormSubmitted: true,
    });
  };

  const backToEditMode = () => {
    this.setState({
      isFormSubmitted: false,
    });
  };

  const handleClear = async () => {
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
  const handleReset = async () => {
    const result = await Swal.fire({
      title: 'Reset Form:\n Are you sure?',
      html: "Form will be filled out with sample data.<br>Your own data will be cleared.<br>You won't be able to revert this!",
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
  return (
    <div className="App">
      <nav>
        <h1>CV Generator</h1>
      </nav>
      {/* Only render form if not submitted. */}
      {/* Only render CV once form is submitted */}
      {/* isFormSubmitted === false */}
      {/* Set to show CV only for now */}

      {isFormSubmitted === false ? (
        <div className="main">
          <Form
            info={info}
            isSubmitted={isFormSubmitted}
            handleSubmission={submitForm}
            handleChange={handleChange}
            handleClear={handleClear}
            handleReset={handleReset}
            addToSection={addToSection}
            removeFromSection={removeFromSection}
            moveUpInSection={moveUpInSection}
            moveDownInSection={moveDownInSection}
          />
          <CV info={info} />
        </div>
      ) : (
        ''
      )}
      {/* ) : (
        <div className="printPage">
          <div className="printGroup">
            <ReactToPrint
              trigger={generatePrintBtn}
              content={() => this.componentRef}
            />
            <button
              type="button"
              className="edit"
              onClick={this.backToEditMode}
            >
              Back to Edit
            </button>
          </div>

          <CV
            info={info}
            ref={(el) => {
              this.componentRef = el;
            }}
          />
        </div>
      )} */}
    </div>
  );
}

export default App;
