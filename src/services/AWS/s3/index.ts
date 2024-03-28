import { ServiceResponse } from 'src/services/types';

import ObjectClient from '../client';
import { GetObjectsInput, GetObjectInput, PutObjectInput } from './types';
import { GET_OBJECTS, GET_OBJECT, PUT_OBJECT } from './graphql';
import { Object } from './types';

const GENERATOR_API_KEY = "da2-ajiaki7dmfgcjd6mazhovjnxxy";

export const getObject = async (
  input: GetObjectInput
): Promise<ServiceResponse<Object | undefined>> => {
  let data: any | undefined;

  try {
    data = (
      await ObjectClient.request({
        method: 'post',
        headers: {
          'x-api-key': GENERATOR_API_KEY,
        },
        data: {
          query: GET_OBJECT,
          variables: {
            input
          },
        },
      })
    )?.data;

    return {
      data: data.data.getObject,
      success: true,
    }
  } catch (err) {
    return {
      success: false,
    };
  }
};

export const putObject = async (
  input: PutObjectInput
): Promise<ServiceResponse<Object | undefined>> => {
  let data: any | undefined;

  try {
    data = (
      await ObjectClient.request({
        method: 'post',
        headers: {
          'x-api-key': GENERATOR_API_KEY,
        },
        data: {
          query: PUT_OBJECT,
          variables: {
            input
          },
        },
      })
    )?.data;
    return {
      data: data.data.putObject,
      success: true,
    }
  } catch (err) {
    return {
      success: false,
    };
  }
};

export const getObjects = async (
  input: GetObjectsInput
): Promise<ServiceResponse<Object[] | undefined>> => {
  let data: any | undefined;

  try {
    data = (
      await ObjectClient.request({
        method: 'post',
        headers: {
          'x-api-key': GENERATOR_API_KEY,
        },
        data: {
          query: GET_OBJECTS,
          variables: {
            input
          },
        },
      })
    )?.data;

    return {
      ...data.data.getObjects,
      success: true,
    };
  } catch (err) {
    return {
      success: false,
    };
  }
};

const S3Service = {
  getObjects,
  getObject,
  putObject
};

export default {
  ...S3Service,
};
