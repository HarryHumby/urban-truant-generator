import axios from 'axios';

const GeneratorClient = axios.create({ baseURL: "https://55km22yvyndxlo5c2vcchsuxqu.appsync-api.eu-west-2.amazonaws.com/graphql" });

GeneratorClient.interceptors.response.use(
  (res) => res,
  (error) => {
    console.error('GeneratorClient', 'interceptor', error);
    Promise.reject((error.response && error.response.data) || 'Something went wrong');
  }
);

export default GeneratorClient;
