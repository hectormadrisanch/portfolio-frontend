import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HealthtrackDetailComponent } from './pages/healthtrack-detail/healthtrack-detail.component';
import { TfgDetailComponent } from './pages/tfg-detail/tfg-detail.component';
import { CognitiveDetailComponent } from './pages/cognitive-detail/cognitive-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'project/healthtrack', component: HealthtrackDetailComponent },
  { path: 'project/tfg', component: TfgDetailComponent },
  { path: 'project/cognitive-platform', component: CognitiveDetailComponent },
  { path: '**', redirectTo: '' }
];