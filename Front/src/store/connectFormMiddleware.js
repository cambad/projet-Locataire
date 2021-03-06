// import npm
import axios from 'axios';
// import local
import AuthenticationMethods from 'src/components/AuthenticationMethods';
import { connectionError } from 'src/store/reducer';

const connectFormMiddleware = store => next => (action) => {
  switch (action.type) {
    case 'SUBMIT_CONNECT_FORM': {
      const { reducer } = store.getState();
      let correctForm = false;

      if (
        reducer.email !== ''
        && reducer.password !== ''
      ) {
        correctForm = true;
      }
      else {
        correctForm = false;
      }
      if (correctForm) {
        const dataToSend = {
          "username": reducer.email,
          "password": reducer.password,
        };
        axios.post('https://api.rate-my-rent.fr/api/login', dataToSend)
          .then((response) => {
            // get token
            const { token } = response.data;

            // store the token in window.localStorage
            const authenticationObject = new AuthenticationMethods();
            authenticationObject.setToken(token);

            // let SUBMIT_CONNECT_FORM action pass
            next(action);
          })
          .catch((error) => {
            // if username or password is incorrect
            store.dispatch(connectionError());
          });
      }
    }
      break;
    default:
      next(action);
  }
};

export default connectFormMiddleware;
