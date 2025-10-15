import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pollution } from '../models/pollution.model';

@Component({
  selector: 'app-pollution-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pollution-summary.html',
  styleUrls: ['./pollution-summary.css']
})
export class PollutionSummaryComponent {
  @Input() pollution?: Pollution;
}
