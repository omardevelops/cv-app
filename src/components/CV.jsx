import React from 'react';

class CV extends React.Component {
  render() {
    const { info } = this.props;
    console.log(info);

    const { general, education, experience } = info;
    return (
      <div className="CV">
        <header>
          <div>
            <h1>{`${general[0].firstName} ${general[0].lastName}`}</h1>
            <h2>{`${general[0].title}`}</h2>
          </div>
          <div className="contactInfo">
            <div>
              <p>{`Phone: ${general[0].phone}`}</p>
            </div>
            <div>
              <p>{`Email: ${general[0].email}`}</p>
            </div>
          </div>
        </header>
        <main>
          <div className="summary">
            <h2>Summary</h2>
            <p>{`${general[0].summary}`}</p>
          </div>
          <div className="experience">
            <h2>Experience</h2>
            <div>
              {experience.map((item) => (
                <div key={item.id}>
                  <div>
                    <h3>{item.positionTitle}</h3>
                    <p>{item.mainTasks}</p>
                  </div>
                  <aside>
                    <h3>{item.companyName}</h3>
                    <p>{`${item.startDate} - ${item.endDate}`}</p>
                  </aside>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default CV;
