import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryDetailCardComponent } from './history-detail-card.component';

describe('HistoryDetailCardComponent', () => {
  let component: HistoryDetailCardComponent;
  let fixture: ComponentFixture<HistoryDetailCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryDetailCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
