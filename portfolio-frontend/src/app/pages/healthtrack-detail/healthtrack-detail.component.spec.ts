import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { HealthtrackDetailComponent } from './healthtrack-detail.component';

describe('HealthtrackDetailComponent', () => {
  let component: HealthtrackDetailComponent;
  let fixture: ComponentFixture<HealthtrackDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HealthtrackDetailComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HealthtrackDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render every section of the case study', () => {
    const sections = fixture.nativeElement.querySelectorAll(
      '.case-study__section',
    );
    expect(sections.length).toBe(
      component.ts.t().detail.healthtrack.sections.length,
    );
  });
});
