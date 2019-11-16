import { Appointment } from './Appointment'

export class Doctor{
    name:String
    serviceId:String
    appointments:Appointment[]
    id:String
    institute:String
    constructor(name:String, serviceId:String,institute:String, id:String){
        this.name = name
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