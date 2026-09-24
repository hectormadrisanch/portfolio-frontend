import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-healthtrack-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './healthtrack-detail.component.html',
  styleUrl: './healthtrack-detail.component.scss'
})
export class HealthtrackDetailComponent {}