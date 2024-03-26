export default `import { ServiceResponse } from 'src/services/types';

import <% pascalCaseName %>Client from '../client';
import CognitoService from '../../cognito';
import { Create<% pascalCaseName %>Input, Get<% pascalCaseName %>sInput, Get<% pascalCaseName %>Input, Update<% pascalCaseName %>Input, Delete<% pascalCaseName %>Input } from './types';
import { CREATE_<% upperCaseName %>, GET_<% upperCaseName %>S, GET_<% upperCaseName %>, UPDATE_<% upperCaseName %>, DELETE_<% upperCaseName %> } from './graphql';

import { <% pascalCaseName %> } from './types';

export const create<% pascalCaseName %> = async (
  input: Create<% pascalCaseName %>Input
): Promise<ServiceResponse<<% pascalCaseName %> | undefined>> => {
  let data: any | undefined;

  const token = await CognitoService.getAuthToken();
  if (!token) throw new Error('No token found');

  try {
    data = (
      await <% pascalCaseName %>Client.request({
        method: 'post',
        headers: {
          Authorization: \`Bearer \${ token } \`,
        },
        data: {
          query: CREATE_<% upperCaseName %>,
          variables: {
            input
          },
        },
      })
    )?.data;

    return {
      data: data.data.create<% pascalCaseName %>,
      success: true,
    }
  } catch (err) {
    return {
      success: false,
    };
  }
};

export const get<% pascalCaseName %> = async (
  input: Get<% pascalCaseName %>Input
): Promise<ServiceResponse<<% pascalCaseName %> | undefined>> => {
  let data: any | undefined;

  const token = await CognitoService.getAuthToken();
  if (!token) throw new Error('No token found');

  try {
    data = (
      await <% pascalCaseName %>Client.request({
        method: 'post',
        headers: {
          Authorization: \`Bearer \${ token } \`,
        },
        data: {
          query: GET_<% upperCaseName %>,
          variables: {
            input
          },
        },
      })
    )?.data;

    return {
      data: data.data.get<% pascalCaseName %>,
      success: true,
    };
  } catch (err) {
    return {
      success: false,
    };
  }
};

export const update<% pascalCaseName %> = async (
  input: Update<% pascalCaseName %>Input
): Promise<ServiceResponse<<% pascalCaseName %> | undefined>> => {
  let data: any | undefined;

  const token = await CognitoService.getAuthToken();
  if (!token) throw new Error('No token found');

  try {
    data = (
      await <% pascalCaseName %>Client.request({
        method: 'post',
        headers: {
          Authorization: \`Bearer \${ token } \`,
        },
        data: {
          query: UPDATE_<% upperCaseName %>,
          variables: {
            input
          },
        },
      })
    )?.data;

    return {
      data: data.data.update<% pascalCaseName %>,
      success: true,
    };
  } catch (err) {
    return {
      success: false,
    };
  }
};

export const delete<% pascalCaseName %> = async (
  input: Delete<% pascalCaseName %>Input
): Promise<ServiceResponse<<% pascalCaseName %> | undefined>> => {
  let data: any | undefined;

  const token = await CognitoService.getAuthToken();
  if (!token) throw new Error('No token found');

  try {
    data = (
      await <% pascalCaseName %>Client.request({
        method: 'post',
        headers: {
          Authorization: \`Bearer \${ token } \`,
        },
        data: {
          query: DELETE_<% upperCaseName %>,
          variables: {
            input
          },
        },
      })
    )?.data;

    return {
      data: data.data.delete<% pascalCaseName %>,
      success: true,
    };
  } catch (err) {
    return {
      success: false,
    };
  }
};

export const get<% pascalCaseName %>s = async (
  input: Get<% pascalCaseName %>sInput
): Promise<ServiceResponse<<% pascalCaseName %>[] | undefined>> => {
  let data: any | undefined;

  const token = await CognitoService.getAuthToken();
  if (!token) throw new Error('No token found');

  try {
    data = (
      await <% pascalCaseName %>Client.request({
        method: 'post',
        headers: {
          Authorization: \`Bearer \${ token } \`,
        },
        data: {
          query: GET_<% upperCaseName %>S,
          variables: {
            input
          },
        },
      })
    )?.data;

    return {
      ...data.data.get<% pascalCaseName %>s,
      success: true,
    };
  } catch (err) {
    return {
      success: false,
    };
  }
};

const PlatformService = {
  create<% pascalCaseName %>,
  get<% pascalCaseName %>s,
  get<% pascalCaseName %>,
  update<% pascalCaseName %>,
  delete<% pascalCaseName %>,
};

export default {
  ...PlatformService,
};`