import React from 'react';
import generateTemplate from './TemplateGenerator';

class General extends React.Component {
  // constructor(props) {
  //   super(props);

  // }

  render() {
    const { generalInfo, handleChange } = this.props;
    // Get array of generalInfo keys
    const infoKeys = Object.keys(generalInfo);
    const template = generateTemplate(infoKeys);
    return (
      <fieldset className="general">
        <legend>Personal Information</legend>

        <div>
          {infoKeys.map((key) => {
            console.log('test');
            let inputElement;
            if (template[key].type === 'textarea') {
              inputElement = (
                <textarea
                  id={key}
                  rows="4"
                  onChange={(e) => handleChange(e, key)}
                />
              );
            } else {
              inputElement = (
                <input
                  type={template[key].type}
                  id={key}
                  value={generalInfo[key]}
                  onChange={(e) => handleChange(e, key)}
                />
              );
            }
            return (
              <label key={key} htmlFor={key}>
                <p>{template[key].label}</p>
                {inputElement}
              </label>
            );
          })}
        </div>
      </fieldset>
    );
  }
}

export default General;
