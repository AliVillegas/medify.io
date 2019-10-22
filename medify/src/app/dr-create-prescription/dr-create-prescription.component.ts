import { Component, OnDestroy, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { NavbarDataService } from '../navbar-data.service';
import { SidebarDataService } from '../sidebar-data.service';
import { Location } from '@angular/common';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { MatSelect } from '@angular/material/select';

import { Medicine, MEDICINES } from './meds-data';

@Component({
  selector: 'app-dr-create-prescription',
  templateUrl: './dr-create-prescription.component.html',
  styleUrls: ['./dr-create-prescription.component.scss']
})
export class DrCreatePrescriptionComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() search = 'Buscar';
  @Input() noneFound = 'No se encontraron opciones';

  protected medicines: Medicine[] = MEDICINES;

  public medControl: FormControl = new FormControl();
  public medFilter: FormControl = new FormControl();

  public filteredMeds: ReplaySubject<Medicine[]> = new ReplaySubject<Medicine[]>(1);

  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;
  createPrescriptionForm: FormGroup

  protected _onDestroy = new Subject<void>();

  constructor(
    private navData: NavbarDataService,
    private sidebarData: SidebarDataService,
    private _location: Location,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initializeNavbarStatus()
    this.initializeSidebarStatus()


    this.filteredMeds.next(this.medicines.slice());

    this.medFilter.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterMedsMulti();
      });

    this.createPrescriptionForm = this.fb.group({
      title: '',
      diagnosis: ''
    })

    this.createPrescriptionForm.valueChanges.subscribe()
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  protected setInitialValue() {
    this.filteredMeds
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        this.multiSelect.compareWith = (a: Medicine, b: Medicine) => a && b && a.id === b.id;
      });
  }

  initializeNavbarStatus() {
    this.navData.changeIsLandingPage(false)
    this.navData.changeIsDashboardPage(false)
    this.navData.changeHasReturnArrow(true)
    this.navData.changePageLocation(this._location)
  }

  initializeSidebarStatus() {
    this.sidebarData.changeIsLandingPage(false)
    this.sidebarData.changeIsDoctor(true)
    this.sidebarData.changeIsPatient(false)
  }

  protected filterMedsMulti() {
    if (!this.medicines) {
      return;
    }
    // get the search keyword
    let search = this.medFilter.value;
    if (!search) {
      this.filteredMeds.next(this.medicines.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredMeds.next(
      this.medicines.filter(medicine => medicine.name.toLowerCase().indexOf(search) > -1)
    );
  }

}
