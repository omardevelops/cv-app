import React from 'react';

class General extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const { info } = this.props;
    return (
      <fieldset className="general">
        <legend>Personal Information</legend>

        <div>
          <label htmlFor="firstname">
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
          </label>
        </div>
      </fieldset>
    );
  }
}

export default General;
