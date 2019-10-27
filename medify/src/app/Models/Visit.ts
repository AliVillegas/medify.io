import { Doctor } from './Doctor'
import { Med } from './Med'
import { Prescription } from './Prescription'

export class Visit{
    diagnosis:String
    date:String
    details:String
    prescriptions:Prescription[]
    month:String
    id:String
    doctor:Doctor
    constructor(title:String,date:String,details:String,month:String,doctor:Doctor,id:String){
        this.prescriptions = []
        this.diagnosis = title
        this.date = date
        this.details = details
        this.month = month
        this.doctor = doctor
    }

    addPrescription(p:Prescription){
        this.prescriptions.push(p)
    }
    setMeds(prescriptions:Prescription[]){
        this.prescriptions = prescriptions
    }
}