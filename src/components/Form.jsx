import React from 'react';
import generateTemplate from './TemplateGenerator';

const sectionTemplate = {
  general: 'Personal Information',
  education: 'Education',
  experience: 'Experience',
};

class Form extends React.Component {
  generateFormFields = (info, section) => {
    // Get array of generalInfo keys
    const { handleChange } = this.props;

    return info.map((item, index) => {
      const infoKeys = Object.keys(item);
      const template = generateTemplate(infoKeys);

      return infoKeys.map((key) => {
        let inputElement;
        if (template[key].type === 'textarea') {
          inputElement = (
            <textarea
              id={key}
              rows="4"
              onChange={(e) => handleChange(e, key, section, index)}
            />
          );
        } else {
          inputElement = (
            <input
              type={template[key].type}
              id={key}
              value={info[key]}
              onChange={(e) => handleChange(e, key, section, index)}
              pattern={template[key].pattern}
            />
          );
        }
        return (
          <label key={key} htmlFor={key}>
            <p>{template[key].label}</p>
            {inputElement}
            <span>{`*Invalid Input. ${template[key].errorMsg ?? ''}`}</span>
          </label>
        );
      });
    });
  };

  // Allows
  generateAddRemoveBtns = (section) => {
    const { addToSection, removeFromSection } = this.props;
    if (section === 'education' || section === 'experience') {
      return (
        <div className="btnGroup">
          <button
            type="button"
            className="add"
            onClick={(e) => addToSection(e, section)}
          >
            Add
          </button>
          <button
            type="button"
            className="remove"
            onClick={(e) => removeFromSection(e, section)}
          >
            Remove
          </button>
        </div>
      );
    }
  };

  render() {
    const { info } = this.props; // Get state
    const sections = Object.keys(info); // Get sections (general, education, experience, etc...)
    return (
      <div>
        {sections.map((section) => (
          <div key={section}>
            <fieldset className={section}>
              <legend>{sectionTemplate[section]}</legend>
              <div>
                {this.generateFormFields(info[section], section)}
                {this.generateAddRemoveBtns(section)}
              </div>
            </fieldset>
          </div>
        ))}
      </div>
    );
  }
}

export default Form;
