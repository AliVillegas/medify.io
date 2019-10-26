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
    id:Number

    constructor(concept:String,dayName:String,dayNumber:String,
                startTime:String,endTime:String,location:String,
                month:String,patient:Patient,doctor:Doctor){
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