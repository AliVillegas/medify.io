import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Auth } from 'aws-amplify';


@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.scss']
})

export class RegisterPatientComponent implements OnInit {
  poolData = {
    "UserPoolId": "us-east-1_EN3uRlqQB",
    "ClientId": "71e53bgsr68pvi54sobk65r16p",
  };
   AmazonCognitoIdentity = require('amazon-cognito-identity-js');
   userPool = new this.AmazonCognitoIdentity.CognitoUserPool(this.poolData);
  registerPatientForm: FormGroup
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('',
    Validators.required,
    );
  nameFormControl = new FormControl('',
    Validators.required,
    );
  constructor(private fb:FormBuilder) {}
  
  ngOnInit() {
    this.registerPatientForm = this.fb.group({
        email: '',
        password: '',
        name: '',
    });
    this.registerPatientForm.valueChanges.subscribe()
  }
  onClickSubmit(email: String, password: String, name:String) {
    //console.log(email)
    var attributeList = [];
    var dataEmail = {
       Name : 'email',
       Value : email
   };
      var dataName = {
        Name : 'custom:name',
        Value : name
    };
    /*
    var attributeEmail = new this.AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
    attributeList.push(attributeEmail);
   var cognitoUser;
   this.userPool.signUp('email', 'password', attributeList, null, function(err, result){
      if (err) {
          console.log(err);
          return;
      }
      cognitoUser = result.user;
      console.log('user name is ' + cognitoUser.getUsername());
  });
  */
  }
  

}
