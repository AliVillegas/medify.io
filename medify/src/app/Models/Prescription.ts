import { Patient } from './Patient'
import { Doctor } from './Doctor'

export class Prescription{
    concept:String
    dayNumber:String
    details:String
    location:String
    month:String
    patient:Patient
    doctor:Doctor
    id:String

    constructor(concept:String,dayNumber:String,
                details:String,month:String,patient:Patient,doctor:Doctor, id:String){
        this.concept = concept
        this.dayNumber = dayNumber
        this.details = details
        this.month = month
        this.patient = patient
        this.doctor = doctor
    }
}