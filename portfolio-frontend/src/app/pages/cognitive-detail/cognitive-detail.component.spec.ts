import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CognitiveDetailComponent } from './cognitive-detail.component';

describe('CognitiveDetailComponent', () => {
  let component: CognitiveDetailComponent;
  let fixture: ComponentFixture<CognitiveDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CognitiveDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CognitiveDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
