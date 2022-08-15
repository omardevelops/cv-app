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
        template[key] = { label: 'Email', type: 'email' };
        break;
      case 'phone':
        template[key] = { label: 'Phone Number', type: 'tel' };
        break;
      case 'summary':
        template[key] = { label: 'Summary', type: 'textarea' };
        break;
      default:
        template[key] = { label: 'oops' };
    }
  });

  return template;
};

export default generateTemplate;
