import React from 'react';
import generateTemplate from './TemplateGenerator';

const sectionTemplate = {
  general: 'Personal Information',
  education: 'Education',
  experience: 'Experience',
};

function Form(props) {
  const generateFormFields = (info, section) => {
    // Get array of generalInfo keys
    const {
      handleChange,
      removeFromSection,
      moveUpInSection,
      moveDownInSection,
    } = props;

    return info.map((item, index) => {
      const infoKeys = Object.keys(item);
      const template = generateTemplate(infoKeys);
      const isModularSect = section === 'education' || section === 'experience';
      let removeBtn = '';
      let moveUpBtn = '';
      let moveDownBtn = '';

      // Only add a remove button for 'education' and 'experience' sections
      if (isModularSect) {
        removeBtn = (
          <button
            type="button"
            className="remove"
            onClick={(e) => {
              removeFromSection(e, section, index, info[index].id);
            }}
          >
            Remove
          </button>
        );

        moveUpBtn = (
          <button
            type="button"
            className="move"
            onClick={(e) => {
              moveUpInSection(e, index, section);
            }}
          >
            Move Up
          </button>
        );
        moveDownBtn = (
          <button
            type="button"
            className="move"
            onClick={(e) => {
              moveDownInSection(e, index, section);
            }}
          >
            Move Down
          </button>
        );
      }

      return (
        <div className="entry" id={info[index].id} key={info[index].id}>
          <h2>{isModularSect ? `Entry ${index + 1}` : ''}</h2>
          {infoKeys.map((key) => {
            // Generate all form fields except for readOnly id field
            if (key !== 'id') {
              let inputElement;

              if (template[key].type === 'textarea') {
                inputElement = (
                  <textarea
                    id={key}
                    rows="4"
                    value={info[index][key]}
                    onChange={(e) => handleChange(e, key, section, index)}
                  />
                );
              } else {
                inputElement = (
                  <input
                    type={template[key].type}
                    id={key}
                    value={info[index][key]}
                    onChange={(e) => handleChange(e, key, section, index)}
                    pattern={template[key].pattern}
                  />
                );
              }
              return (
                <label key={key} htmlFor={key}>
                  <p>{template[key].label}</p>
                  {inputElement}
                  <span>
                    {`*Invalid Input. ${template[key].errorMsg ?? ''}`}
                  </span>
                </label>
              );
            }
            return '';
          })}

          <div className="itemBtns">
            <div>
              {moveUpBtn}
              {moveDownBtn}
            </div>
            {removeBtn}
          </div>
        </div>
      );
    });
  };

  // Allows
  const generateAddBtn = function (section) {
    const { addToSection } = props;
    if (section === 'education' || section === 'experience') {
      return (
        <div className="btnGroup">
          <button
            type="button"
            className="add"
            onClick={(e) => addToSection(e, section)}
          >
            Add
            {` ${section}`}
          </button>
        </div>
      );
    }
    return '';
  };

  const onFormSubmit = (e) => {
    const { handleSubmission } = props;
    e.preventDefault();
    handleSubmission();
  };

  const { info, handleClear, handleReset } = props; // Get state
  const sections = Object.keys(info); // Get sections (general, education, experience, etc...)
  return (
    <form onSubmit={onFormSubmit}>
      {sections.map((section) => (
        <div key={section}>
          <fieldset className={section}>
            <legend>{sectionTemplate[section]}</legend>
            <div>
              {generateFormFields(info[section], section)}
              {generateAddBtn(section)}
            </div>
          </fieldset>
        </div>
      ))}

      <div className="btnGroup">
        <button type="submit" className="submit">
          Export Form (PDF)
        </button>
        <div>
          <button type="button" className="reset" onClick={handleReset}>
            Reset Form
          </button>
          <button type="button" className="clear" onClick={handleClear}>
            Clear Form
          </button>
        </div>
      </div>
    </form>
  );
}

export default Form;
