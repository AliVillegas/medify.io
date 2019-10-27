import { Patient } from './Patient'
import { Doctor } from './Doctor'

export class Appointment{
    concept:String
    dayName:String
    dayNumber:String
    startTime:String
    endTime:String
    location:String
    month:String
    patient:Patient
    doctor:Doctor
    id:String

    constructor(concept:String,dayName:String,dayNumber:String,
                startTime:String,endTime:String,location:String,
                month:String,patient:Patient,doctor:Doctor, id:String){
        this.concept = concept
        this.dayName = dayName
        this.dayNumber = dayNumber
        this.startTime = startTime
        this.endTime = endTime
        this.location = location
        this.month = month
        this.patient = patient
        this.doctor = doctor
    }
}