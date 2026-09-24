import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthtrackDetailComponent } from './healthtrack-detail.component';

describe('HealthtrackDetailComponent', () => {
  let component: HealthtrackDetailComponent;
  let fixture: ComponentFixture<HealthtrackDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HealthtrackDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealthtrackDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
