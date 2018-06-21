export interface Place {
  streetNumber?: string,
  street?: string,
  city: string,
  county?: string,
  region?: string,
  country: string,
  postalCode?: string
}

export const STREET_NUMBER_DETAILS = 'street_number';
export const STREET_DETAILS = 'route';
export const CITY_DETAILS = 'locality';
export const COUNTY_DETAILS = 'administrative_area_level_2';
export const REGION_DETAILS = 'administrative_area_level_1';
export const COUNTRY_DETAILS = 'country';
export const POSTAL_CODE_DETAILS = 'postal_code';
