// Used to dynamically generate the ID based on the App's state
const generateTemplate = (keys) => {
  const template = {};
  keys.forEach((key) => {
    switch (key) {
      case 'firstName':
        template[key] = { label: 'First Name' };
        break;
      case 'lastName':
        template[key] = { label: 'Last Name' };
        break;
      case 'email':
        template[key] = {
          label: 'Email',
          type: 'email',
          errorMsg: 'Use a valid email format (johnsmith@jonathan.com)',
        };
        break;
      case 'phone':
        template[key] = {
          label: 'Phone Number',
          type: 'tel',
        };
        break;
      case 'summary':
        template[key] = { label: 'Summary', type: 'textarea' };
        break;
      case 'institutionName':
        template[key] = { label: 'Institution Name' };
        break;
      case 'titleOfStudy':
        template[key] = { label: 'Title of Study' };
        break;
      case 'startDate':
        template[key] = { label: 'Start Date', type: 'date' };
        break;
      case 'endDate':
        template[key] = { label: 'End Date', type: 'date' };
        break;
      default:
        template[key] = { label: 'ErrorLabel' };
    }
  });

  return template;
};

export default generateTemplate;
