import { Appointment } from './Appointment'

export class Doctor{
    name:String
    email:String
    password:String
    serviceId:String
    appointments:Appointment[]
    id:String
    institute:String
    constructor(name:String,email:String,password:String, serviceId:String,institute:String, id:String){
        this.name = name
        this.email = email
        this.password = password
        this.serviceId = serviceId
        this.id = id 
        this.institute = institute
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
    getServiceId(){
        return this.serviceId
    }

}