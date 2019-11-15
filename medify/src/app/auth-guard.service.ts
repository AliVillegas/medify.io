import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { AmplifyService } from "aws-amplify-angular";

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    public amplifyService: AmplifyService,
    private _router: Router
  ) {}

  public canActivate() {
    console.log("AuthGuard#canActivate called");
    this.amplifyService = this.amplifyService
    return this.amplifyService
      .auth()
      .currentAuthenticatedUser()
      .then(user => true)
      .catch(err => {
        this._router.navigateByUrl("");
        return false;
      });
  }
}