import { Appointment } from './Appointment'

export class Patient{
    name:String
    email:String
    password:String
    appointments:Appointment[]
    id:String
    constructor(name:String,email:String,password:String, id:String){
        this.name = name
        this.email = email
        this.password = password
    }

    addAppointment(appointment:Appointment){
        this.appointments.push(appointment)
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