import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighscoreEntryComponent } from './highscore-entry.component';

describe('HighscoreEntryComponent', () => {
  let component: HighscoreEntryComponent;
  let fixture: ComponentFixture<HighscoreEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighscoreEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighscoreEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
