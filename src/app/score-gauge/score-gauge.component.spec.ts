import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreGaugeComponent } from './score-gauge.component';

describe('ScoreGaugeComponent', () => {
  let component: ScoreGaugeComponent;
  let fixture: ComponentFixture<ScoreGaugeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoreGaugeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreGaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
