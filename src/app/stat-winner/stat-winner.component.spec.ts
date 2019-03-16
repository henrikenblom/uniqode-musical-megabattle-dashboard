import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatWinnerComponent } from './stat-winner.component';

describe('StatWinnerComponent', () => {
  let component: StatWinnerComponent;
  let fixture: ComponentFixture<StatWinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatWinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatWinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
