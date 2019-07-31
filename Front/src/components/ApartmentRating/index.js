import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import NotationFormVisiteur from 'src/containers/ApartmentRating/notationFormVisiteur';
import NotationFormLocataire from 'src/containers/ApartmentRating/notationFormLocataire';
import PlaceAutocomplete from './placesAutocomplete';
import Commentaire from './commentaire';
import InformationGenerale from './informationGenerale';

import './apartmentRating.scss';

const ApartmentRating = ({
  address,
  isLocataire,
  isVisiteur,
  isDisplayed,
  isLocataireChange,
  isVisiteurChange,
  changeAdress,
  getAddressLatLng,
}) => {
  const handleChange = (addressInput) => {
    changeAdress(addressInput);
  };

  const handleLocataire = () => {
    isLocataireChange();
  };

  const handleVisiteur = () => {
    isVisiteurChange();
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    geocodeByAddress(address)
      .then((results) => {
        return (getLatLng(results[0]));
      })
      .then((latLng) => {
        console.log(latLng);
        getAddressLatLng(latLng);
      })
      .catch(error => console.error('Error', error));
  };

  return (
    <div className="notation-form">
      <PlaceAutocomplete
        address={address}
        handleChange={handleChange}
      />
      <div>
        <form className="main-form">
          <div className="information-generales">
            <h1 className="information-generales-title">Informations générales</h1>
            <div className="information-generales-radio">
              <div>
                <p>Je suis un :</p>
              </div>
              <div>
                <input type="radio" name="locataire/visiteur" id="locataire/visiteur" value="locataire/visiteur" onChange={handleLocataire} />
                <label htmlFor="locataire/visiteur">Locataire</label>
                <input type="radio" name="locataire/visiteur" id="locataire/visiteur" value="locataire/visiteur" onChange={handleVisiteur} />
                <label htmlFor="locataire/visiteur">Visiteur</label>
              </div>
            </div>
            {isDisplayed && <InformationGenerale />}
            {isLocataire && (
              <NotationFormLocataire />
            )}
            {isVisiteur && (
              <NotationFormVisiteur />
            )}
          </div>
          {isDisplayed && <Commentaire isDisplayed={isDisplayed} />}
          <button className={classNames({ 'form-submit-hidden': !isDisplayed, 'form-submit': isDisplayed })} onClick={handleSubmit} type="submit">Valider l'évalutation de cet appartement</button>
        </form>
      </div>
    </div>
  );
};

// PropTypes validation
ApartmentRating.propTypes = {
  address: PropTypes.string.isRequired,
  isLocataire: PropTypes.bool.isRequired,
  isVisiteur: PropTypes.bool.isRequired,
  isDisplayed: PropTypes.bool.isRequired,
  isLocataireChange: PropTypes.func.isRequired,
  isVisiteurChange: PropTypes.func.isRequired,
  changeAdress: PropTypes.func.isRequired,
};

export default ApartmentRating;