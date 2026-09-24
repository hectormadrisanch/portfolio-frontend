import { Routes } from '@angular/router';
import { TfgDetailComponent } from './pages/tfg-detail/tfg-detail.component';
import { HealthtrackDetailComponent } from './pages/healthtrack-detail/healthtrack-detail.component';
import { CognitiveDetailComponent } from './pages/cognitive-detail/cognitive-detail.component';

export const routes: Routes = [
  { path: 'project/tfg', component: TfgDetailComponent },
  { path: 'project/healthtrack', component: HealthtrackDetailComponent },
  { path: 'project/cognitive-platform', component: CognitiveDetailComponent }
];