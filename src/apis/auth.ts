import axios from 'axios';
import { CreateUserDto, LoginUserDto } from '../types/types';

const PROJECT_ID = 'fir-test-04-2f5cd';
const REGION = 'asia-northeast1';

const baseURL = process.env.API_URL || `http://127.0.0.1:5001/${PROJECT_ID}/${REGION}`;

const createUser = async (path:string, body: CreateUserDto) => {
  const url = baseURL + path;
  return await axios.post(
    url,
    body,
    {
      headers: {
        "Content-Type": "application/json",
        "X-Custom-Header": "YourCustomValue",
        "Access-Control-Allow-Origin": "*"
      }
    }
  )
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
}

const loginUser = async (path: string, body: LoginUserDto) => {
  const url = baseURL + path;
  return await axios.post(url, body)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
}

export { createUser, loginUser }