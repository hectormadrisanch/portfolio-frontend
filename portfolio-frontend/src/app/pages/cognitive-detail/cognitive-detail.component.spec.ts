import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { CognitiveDetailComponent } from './cognitive-detail.component';

describe('CognitiveDetailComponent', () => {
  let component: CognitiveDetailComponent;
  let fixture: ComponentFixture<CognitiveDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CognitiveDetailComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(CognitiveDetailComponent);
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
      component.ts.t().detail.cognitive.sections.length,
    );
  });
});
