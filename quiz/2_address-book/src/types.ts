export interface PhoneNumberDictionary {
  [phone: string]: {
    num: number;
  };
}

export interface Contact {
  name: string;
  address: string;
  phones: PhoneNumberDictionary;
}

export enum PhoneType {
  HOME = 'home',
  OFFICE = 'office',
  STUDIO = 'studio',
}
