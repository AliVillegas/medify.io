import { Appointment } from './Appointment'
import { Prescription } from './Prescription'

export class Patient{
    name:String
    email:String
    password:String
    appointments:Appointment[]
    id:String
    weight:String
    height:String
    bloodType:String
    alergies:String
    cronicDiseases:String
    notes:String
    prescriptions:Prescription[]

    constructor(name:String,email:String,password:String, id:String){
        this.prescriptions = []
        this.name = name
        this.email = email
        this.password = password
        this.id = id 
    }

    setWeight(s:String){
        this.weight = s
    }
    setHeight(s:String){
        this.height = s
    }
    setBloodType(s:String){
        this.bloodType = s
    }
    setNotes(s:String){
        this.notes = s
    }
    setAlergies(s:String){
        this.alergies = s
    }
    setCronicDiseases(s:String){
        this.cronicDiseases = s
    }
    addAppointment(appointment:Appointment){
        this.appointments.push(appointment)
    }
    addPrescription(p:Prescription){
        this.prescriptions.push(p)
    }

    getName(){
        return this.name
    }
    getPassword(){
        return this.password
    }
    getEmail(){
        return this.email
    }
    getAppointments(){
        return this.appointments
    }
    getId(){
        return this.id
    }
}