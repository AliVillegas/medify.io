import { Patient } from './Patient'
import { Doctor } from './Doctor'
import { Med } from './Med'

export class Prescription{
    title:String
    dayNumber:String
    details:String
    location:String
    month:String
    doctor:Doctor
    id:String
    meds:Med[]
    status:String
    endDate:String

    constructor(title:String,dayNumber:String,
                details:String,month:String,doctor:Doctor,endDate:String, id:String){
        this.meds = []
        this.title = title
        this.dayNumber = dayNumber
        this.details = details
        this.month = month
        this.doctor = doctor
        this.endDate = endDate
    }
    setStatus(s:String){
        this.status = s
    }
    addMed(m:Med){
        this.meds.push(m)
    }
    setMeds(meds){
        this.meds = meds
    }
}