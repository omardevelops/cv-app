import React from 'react';
import { format } from 'date-fns';

console.log(format(new Date('2022-07-01'), 'LLL yyyy'));

// Converts YYYY-MM-DD date to MMM YYYY (May 2021), for example
const convertDates = (start, end) => {
  if (!start || !end) return '';
  const startResult = format(new Date(start), 'LLL yyyy');
  let endResult;
  if (end.length !== 10) endResult = 'Present';
  else endResult = format(new Date(end), 'LLL yyyy');

  return `${startResult} - ${endResult}`;
};

const CV = React.forwardRef((props, ref) => {
  const { info } = props;
  console.log(info);

  const { general, education, experience } = info;
  return (
    <div ref={ref} className="CV">
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
                  <p>{convertDates(item.startDate, item.endDate)}</p>
                </aside>
              </div>
            ))}
          </div>
        </div>
        <div className="education">
          <h2>Education</h2>
          <div>
            {education.map((item) => (
              <div key={item.id}>
                <div>
                  <h3>{item.titleOfStudy}</h3>
                  <p>{`GPA ${item.GPA}`}</p>
                </div>
                <aside>
                  <h3>{item.institutionName}</h3>
                  <p>{convertDates(item.startDate, item.endDate)}</p>
                </aside>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
});

export default CV;
