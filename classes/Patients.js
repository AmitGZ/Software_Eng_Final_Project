import { check } from 'express-validator'
import { checkDate } from './date-schema.js'
import { checkAddress } from './Address.js'
import { checkPrimaryDetails } from './primary-details.js';
import { getSingleById, isUnique } from './functions.js'

export class Patients{
    constructor(){
        this.patients =[]
    }

    getAll(){
        return this.patients;
    }

    addPatient(patient){
        this.patients.push(patient)
    }

    getById(id){
        return getSingleById(this.patients, id, 'govtID')
    }
}

export function checkPatient(arr){ 
    return [
    checkPrimaryDetails(),
    check('govtID').notEmpty().isString().custom((value)=> {return  isUnique(arr,value,'govtID')}),
    checkDate('birthDate'),
    check('email').notEmpty().isString(),
    checkAddress('address'),
    check('houseResidentsAmount').notEmpty().isInt(),
    check('isCovidPositive').notEmpty().isBoolean()
    ];
}