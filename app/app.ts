import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PollutionFormComponent } from './pollution-form/pollution-form';
import { PollutionSummaryComponent } from './pollution-summary/pollution-summary';
import { Pollution } from './models/pollution.model';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PollutionFormComponent, PollutionSummaryComponent, RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  pollution?: Pollution;

  onDeclaration(payload: Pollution) {
    this.pollution = payload;
  }

  reset() {
    this.pollution = undefined;
  }
}
