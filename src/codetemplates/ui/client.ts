export default `import axios from 'axios';

import { <% upperCaseName %>_API } from 'src/config-global';

const <% pascalCaseName %>Client = axios.create({ baseURL: <% upperCaseName %>_API });

<% pascalCaseName %>Client.interceptors.response.use(
  (res) => res,
  (error) => {
    console.error('<% pascalCaseName %>Client', 'interceptor', error);
    Promise.reject((error.response && error.response.data) || 'Something went wrong');
  }
);

export default <% pascalCaseName %>Client;`
