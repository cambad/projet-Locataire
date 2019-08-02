// == Initial State
const initialState = {
  isConnected: true,
  visitorValue: {
    recommendationValue: 0,
    exteriorValue: 0,
    interiorValue: 0,
    contactValue: 0,
  },
  tenantValue: {
    accessiblityValue: 0,
    apartmentEnvironnementValue: 0,
    circulationValue: 0,
    exteriorValue: 0,
    buildingEnvironnementValue: 0,
    isolationValue: 0,
    cleanlinessValue: 0,
    brightnessValue: 0,
    contactValue: 0,
    contactQualityValue: 0,
  },
  addressForm: '',
  latLng: {
    lat: '',
    lng: '',
  },
  isVisiteur: false,
  isLocataire: false,
  isDisplayed: false,
  stillInApartment: false,
  notLiveInApartment: false,
  agency: false,
  owner: false,
  floorArea: 0,
  numberOfRooms: 0,
  rent: 0,
  abstractedComment: '',
  positiveComment: '',
  negativeComment: '',
  recommendationPositive: false,
  recommendationNegative: false,
};

// == Types
const CHANGE_IS_LOCATAIRE = 'CHANGE_IS_LOCATAIRE';
const CHANGE_IS_VISITEUR = 'CHANGE_IS_VISITEUR';
const CHANGE_ADDRESS_FORM_INPUT = 'CHANGE_ADDRESS_FORM_INPUT';
const CHANGE_STILL_IN = 'CHANGE_STILL_IN';
const CHANGE_NOT_LIVE = 'CHANGE_NOT_LIVE';
const CHANGE_AGENCY = 'CHANGE_AGENCY';
const CHANGE_OWNER = 'CHANGE_OWNER';
const CHANGE_FLOOR_AREA = 'CHANGE_FLOOR_AREA';
const CHANGE_NUMBER_ROOMS = 'CHANGE_NUMBER_ROOMS';
const CHANGE_RENT = 'CHANGE_RENT';
const CHANGE_ABSTRACTED_COMMENT = 'CHANGE_ABSTRACTED_COMMENT';
const VISITOR_STARS = 'VISITOR_STARS';
const TENANT_STARS = 'TENANT_STARS';
const GET_LAT_LNG = 'GET_LAT_LNG';
const CHANGE_POSITIVE_COMMENT = 'CHANGE_POSITIVE_COMMENT';
const CHANGE_NEGATIVE_COMMENT = 'CHANGE_NEGATIVE_COMMENT';
const SUBMIT_RATING_FORM = 'SUBMIT_RATING_FORM';
const CHANGE_RECOMMENDATION_POSITIVE = 'CHANGE_RECOMMENDATION_POSITIVE';
const CHANGE_RECOMMENDATION_NEGATIVE = 'CHANGE_RECOMMENDATION_NEGATIVE';

// == Reducer
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_IS_LOCATAIRE:
      return {
        ...state,
        isVisiteur: false,
        isLocataire: true,
        isDisplayed: true,
        visitorValue: {
          ...state.visitorValue,
          recommendationValue: 0,
          exteriorValue: 0,
          interiorValue: 0,
          contactValue: 0,
        },
      };

    case CHANGE_IS_VISITEUR:
      return {
        ...state,
        isVisiteur: true,
        isLocataire: false,
        isDisplayed: true,
        tenantValue: {
          ...state.tenantValue,
          accessiblityValue: 0,
          apartmentEnvironnementValue: 0,
          circulationValue: 0,
          exteriorValue: 0,
          buildingEnvironnementValue: 0,
          isolationValue: 0,
          cleanlinessValue: 0,
          brightnessValue: 0,
          contactValue: 0,
          contactQualityValue: 0,
        },
      };

    case CHANGE_ADDRESS_FORM_INPUT:
      return {
        ...state,
        addressForm: action.address,
      };

    case CHANGE_STILL_IN:
      return {
        ...state,
        stillInApartment: true,
        notLiveInApartment: false,
      };

    case CHANGE_NOT_LIVE:
      return {
        ...state,
        stillInApartment: false,
        notLiveInApartment: true,
      };

    case CHANGE_AGENCY:
      return {
        ...state,
        agency: true,
        owner: false,
      };

    case CHANGE_OWNER:
      return {
        ...state,
        agency: false,
        owner: true,
      };

    case CHANGE_FLOOR_AREA:
      return {
        ...state,
        floorArea: action.value,
      };

    case CHANGE_NUMBER_ROOMS:
      return {
        ...state,
        numberOfRooms: action.value,
      };

    case CHANGE_RENT:
      return {
        ...state,
        rent: action.value,
      };
    
    case CHANGE_ABSTRACTED_COMMENT:
      return {
        ...state,
        abstractedComment: action.value,
      };

    case VISITOR_STARS:
      return {
        ...state,
        visitorValue: {
          ...state.visitorValue,
          [action.name]: action.stars,
        },
      };

    case TENANT_STARS:
      return {
        ...state,
        tenantValue: {
          ...state.tenantValue,
          [action.name]: action.stars,
        },
      };

    case GET_LAT_LNG:
      return {
        ...state,
        latLng: action.latLng,
      };

    case CHANGE_POSITIVE_COMMENT:
      return {
        ...state,
        positiveComment: action.comment,
      };

    case CHANGE_NEGATIVE_COMMENT:
      return {
        ...state,
        negativeComment: action.comment,
      };

    case CHANGE_RECOMMENDATION_POSITIVE:
      return {
        ...state,
        recommendationPositive: true,
        recommendationNegative: false,
      };

    case CHANGE_RECOMMENDATION_NEGATIVE:
      return {
        ...state,
        recommendationPositive: false,
        recommendationNegative: true,
      };

    default:
      return state;
  }
};

// == Action Creators
export const changeIsLocataire = () => ({
  type: CHANGE_IS_LOCATAIRE,
});

export const changeIsVisiteur = () => ({
  type: CHANGE_IS_VISITEUR,
});

export const changeAgency = () => ({
  type: CHANGE_AGENCY,
});

export const changeOwner = () => ({
  type: CHANGE_OWNER,
});

export const changeRent = value => ({
  type: CHANGE_RENT,
  value,
});

export const changeAddressFormInput = address => ({
  type: CHANGE_ADDRESS_FORM_INPUT,
  address,
});

export const changeStillInApartment = () => ({
  type: CHANGE_STILL_IN,
});

export const changeNotLiveInApartment = () => ({
  type: CHANGE_NOT_LIVE,
});

export const changeFloorArea = value => ({
  type: CHANGE_FLOOR_AREA,
  value,
});

export const changeNumberOfRooms = value => ({
  type: CHANGE_NUMBER_ROOMS,
  value,
});

export const visitorStars = (stars, name) => ({
  type: VISITOR_STARS,
  stars,
  name,
});

export const changeAbstractedComment = value => ({
  type: CHANGE_ABSTRACTED_COMMENT,
  value,
});

export const tenantStars = (stars, name) => ({
  type: TENANT_STARS,
  stars,
  name,
});

export const getAddressLatLng = latLng => ({
  type: GET_LAT_LNG,
  latLng,
});

export const changePositiveComment = comment => ({
  type: CHANGE_POSITIVE_COMMENT,
  comment,
});

export const changeNegativeComment = comment => ({
  type: CHANGE_NEGATIVE_COMMENT,
  comment,
});

export const submitRatingForm = () => ({
  type: SUBMIT_RATING_FORM,
});

export const changeRecommendationPositive = () => ({
  type: CHANGE_RECOMMENDATION_POSITIVE,
});

export const changeRecommendationNegative = () => ({
  type: CHANGE_RECOMMENDATION_NEGATIVE,
});

// == Selectors


// == Export
export default reducer;
