import React from 'react';
import generateTemplate from './TemplateGenerator';

class General extends React.Component {
  // constructor(props) {
  //   super(props);

  // }

  render() {
    const { generalInfo } = this.props;
    // Get array of generalInfo keys
    const infoKeys = Object.keys(generalInfo);
    const template = generateTemplate(infoKeys);
    return (
      <fieldset className="general">
        <legend>Personal Information</legend>

        <div>
          {infoKeys.map((key) => {
            const dom = {
              type: 'text',
              id: key,
            };
            if (key === 'email') {
              dom.type = key;
            }
            return (
              <label htmlFor={dom.id}>
                <p>{template[key]}</p>
                <input type={dom.type} id={dom.id} />
              </label>
            );
          })}
          {/* <label htmlFor="firstname">
            <p>First Name</p>
            <input type="text" id="firstname" />
          </label>
          <label htmlFor="lastname">
            <p>Last Name</p>
            <input type="text" id="lastname" />
          </label>
          <label htmlFor="email">
            <p>Email</p>
            <input type="email" id="email" />
          </label> */}
        </div>
      </fieldset>
    );
  }
}

export default General;
