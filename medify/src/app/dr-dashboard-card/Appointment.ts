export class Appointment{
    private patientName:String
    private dayName:String
    private dayNumber:String
    private month:String
    private concept:String
  
    constructor(patient:String, dayName:String,dayNumber:String,month:String, concept:String){
      this.patientName = patient
      this.dayName = dayName
      this.dayNumber = dayNumber
      this.month = month
      this.concept = concept
    }
  }