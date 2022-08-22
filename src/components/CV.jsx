import React from 'react';

class CV extends React.Component {
  render() {
    const { info } = this.props;
    console.log(info);

    const { general, education, experience } = info;
    return (
      <div className="CV">
        <header>
          <h1>{`${general[0].firstName} ${general[0].lastName}`}</h1>
          <h3>{`Phone ${general[0].phone}`}</h3>
          <h3>{`Email ${general[0].email}`}</h3>
        </header>
      </div>
    );
  }
}

export default CV;
