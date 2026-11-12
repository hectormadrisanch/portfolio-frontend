import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { TfgDetailComponent } from './tfg-detail.component';

describe('TfgDetailComponent', () => {
  let component: TfgDetailComponent;
  let fixture: ComponentFixture<TfgDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TfgDetailComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(TfgDetailComponent);
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
    expect(sections.length).toBe(component.ts.t().detail.tfg.sections.length);
  });
});
