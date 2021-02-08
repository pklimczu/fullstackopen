/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { NewPatientEntry } from './types';

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

const parseString = (entry: any): string => {
    if (!entry || !isString(entry)) {
        throw new Error('Value is not a string');
    }
    return entry;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };
  
  const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error(`Incorrect or missing date: ${date}`);
    }
    return date;
  };

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const toNewPatientEntry = (object: any): NewPatientEntry => {
    const newEntry: NewPatientEntry = {
        name: parseString(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseString(object.ssn),
        gender: parseString(object.gender),
        occupation: parseString(object.occupation)
    };

    return newEntry;
};

export default toNewPatientEntry;