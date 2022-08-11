const generateTemplate = (keys) => {
  const template = {};
  keys.forEach((key) => {
    switch (key) {
      case 'firstName':
        template[key] = 'First Name';
        break;
      case 'lastName':
        template[key] = 'Last Name';
        break;
      case 'email':
        template[key] = 'Email';
        break;
      default:
        template[key] = 'oops';
    }
  });

  return template;
};

export default generateTemplate;
