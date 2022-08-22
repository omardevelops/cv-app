import React from 'react';

class CV extends React.Component {
  render() {
    const { info } = this.props;
    console.log(info);

    const { general, education, experience } = info;
    return (
      <div className="CV">
        <header>
          <h1>{general.firstName}</h1>
        </header>
      </div>
    );
  }
}

export default CV;
