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
    const { handleChange, removeFromSection } = this.props;

    return info.map((item, index) => {
      const infoKeys = Object.keys(item);
      const template = generateTemplate(infoKeys);

      return (
        <div id={info[index].id} key={info[index].id}>
          {infoKeys.map((key) => {
            if (key !== 'id') {
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

          <button type="button" className="remove" onClick={removeFromSection}>
            Remove
          </button>
        </div>
      );
    });
  };

  // Allows
  generateAddBtn = (section) => {
    const { addToSection } = this.props;
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
        </div>
      );
    }
    return '';
  };

  render() {
    const { info, addToSection } = this.props; // Get state
    const sections = Object.keys(info); // Get sections (general, education, experience, etc...)
    return (
      <div>
        {sections.map((section) => (
          <div key={section}>
            <fieldset className={section}>
              <legend>{sectionTemplate[section]}</legend>
              <div>
                {this.generateFormFields(info[section], section)}
                {this.generateAddBtn(section)}
              </div>
            </fieldset>
          </div>
        ))}
      </div>
    );
  }
}

export default Form;
