// import npm
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import axios from 'axios';

import {
  getAddressLatLng,
  changeFormLoading,
  changeFormSubmitSuccess,
  changeFormSubmitFailure,
} from 'src/store/reducer';

const formRatingMiddleware = store => next => (action) => {

  switch (action.type) {
    case 'SUBMIT_RATING_FORM': {
      // check if the form is correct
      // First, create a variable to know at the end, if everything is correct
      let correctForm = false;
      // retrieve state from reducer
      const { reducer } = store.getState();

      // Check address validation
      correctForm = reducer.addressForm !== '';

      // Check stars from visitor or tenant
      if (reducer.isVisiteur) {
        // iterate through the values from an object to test the value and send true if value > 0
        correctForm = Object.values(reducer.visitorValue).every(currentValue => currentValue > 0);
      }
      else {
        correctForm = Object.values(reducer.tenantValue).every(currentValue => currentValue > 0);
      }

      // check floorNumber, location, numberOfRooms and rent
      if (
        reducer.floorNumber !== 0
        && reducer.location !== ''
        && reducer.floorArea !== 0
        && reducer.numberOfRooms !== 0
        && reducer.rent !== 0
      ) {
        correctForm = true;
      }
      else {
        correctForm = false;
      }

      // check title, positive and negative comments
      if (
        reducer.abstractedComment !== ''
        && reducer.positiveComment !== ''
        && reducer.negativeComment !== ''
      ) {
        correctForm = true;
      }
      else {
        correctForm = false;
      }

      // retrieve formLoading to display a loading circle

      /**
       * 
       * 
       * ATTETION !!! Enlever la ligne en dessous !!!!!!!!!!!!!!!!!!!!!!
       * 
       */
      // correctForm = true;
      // If correctForm = true, we can request the latitude and longitude with the address
      if (correctForm) {
        // create dataToSend variable
        let dataToSend = {};
        // ajax request
        geocodeByAddress(reducer.addressForm)
          .then((results) => {
            return (getLatLng(results[0]));
          })
          .then((latLng) => {
            // Get latitude and longitude and dispatch it in reducer
            store.dispatch(getAddressLatLng(latLng));
            // change formLoading to true to display a loading icone
            store.dispatch(changeFormLoading());
            // creating the object to send in the request to retrieve the latitude/logitude inside
            dataToSend = {
              "address": reducer.addressForm,
              "floor_number": reducer.floorNumber,
              "location": reducer.location,
              "area": reducer.floorArea,
              "rooms": reducer.numberOfRooms,
              "rental": reducer.rent,
              "lat": reducer.latLng.lat,
              "lng": reducer.latLng.lng,
              "reviews": [
                {
                  "title": reducer.abstractedComment,
                  "positive": reducer.positiveComment,
                  "negative": reducer.negativeComment,
                  "still_in": reducer.stillInApartment,
                  "tenant": reducer.isLocataire,
                  "marks": [
                    {
                      "recommendation": reducer.visitorValue.recommendationValue,
                      "exterior": reducer.visitorValue.exteriorValue,
                      "interior": reducer.visitorValue.interiorValue,
                      "contact": reducer.visitorValue.contactValue,
                      "accessibility": reducer.tenantValue.accessiblityValue,
                      "apartmentEnvironment": reducer.tenantValue.apartmentEnvironmentValue,
                      "traffic": reducer.tenantValue.circulationValue,
                      "exteriorBuilding": reducer.tenantValue.exteriorValue,
                      "buildingEnvironment": reducer.tenantValue.buildingEnvironmentValue,
                      "insulation": reducer.tenantValue.isolationValue,
                      "cleanliness": reducer.tenantValue.cleanlinessValue,
                      "brightness": reducer.tenantValue.brightnessValue,
                      "firstContact": reducer.tenantValue.contactValue,
                      "contact_quality": reducer.tenantValue.contactQualityValue
                    },
                  ],
                },
              ],
            };
            console.log(dataToSend);
            axios.post('https://api.rate-my-rent.fr/api/apartment/new', dataToSend)
              .then((response) => {
                // stop displaying the form submit loader
                store.dispatch(changeFormLoading());
                store.dispatch(changeFormSubmitSuccess());
                console.log(response);
              })
              .catch((response) => {
                // stop displaying the form submit loader
                store.dispatch(changeFormLoading());
                store.dispatch(changeFormSubmitFailure());
                console.log(response);
              });
          })
          .catch((error) => {
            // If there is no address, display the error
            console.log('je laisse passer l\'action');
            next(action);
          });
      }
      else {
        // the action can pass in the reducer to change a state and display an error message
        next(action);
      }
      break;
    }
    default:
      next(action);
  }
};

export default formRatingMiddleware;