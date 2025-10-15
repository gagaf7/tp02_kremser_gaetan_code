import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Pollution } from '../models/pollution.model';

@Component({
  selector: 'app-pollution-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pollution-form.html',
  styleUrls: ['./pollution-form.css']
})
export class PollutionFormComponent {
  @Output() declarationSubmitted = new EventEmitter<Pollution>();

  types = ['Plastique', 'Chimique', 'Dépôt sauvage', 'Eau', 'Air', 'Autre'];

  form: FormGroup;
  today: string;

  constructor(private fb: FormBuilder) {
    this.today = new Date().toISOString().split('T')[0];
    this.form = this.fb.group({
      titre: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      dateObservation: ['', Validators.required],
      lieu: ['', Validators.required],
      latitude: ['', [Validators.required, Validators.pattern(/^[-+]?\d+(\.\d+)?$/), Validators.min(-90), Validators.max(90)]],
      longitude: ['', [Validators.required, Validators.pattern(/^[-+]?\d+(\.\d+)?$/), Validators.min(-180), Validators.max(180)]],
      photoUrl: ['']
    });
  }

  get formControls() {
    return this.form.controls;
  }

  submitDeclaration(): void {
    console.log('[PollutionForm] submitDeclaration called, valid =', this.form.valid);
    if (!this.form) { return; }
    if (this.form.invalid) {
      console.warn('[PollutionForm] form invalid, marking touched');
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    const payload: Pollution = {
      titre: (value.titre || '').trim(),
      type: value.type,
      description: (value.description || '').trim(),
      dateObservation: value.dateObservation,
      lieu: (value.lieu || '').trim(),
      latitude: Number(value.latitude),
      longitude: Number(value.longitude),
      photoUrl: value.photoUrl ? value.photoUrl.trim() : undefined
    };

    console.log('[PollutionForm] emitting declarationSubmitted', payload);
    this.declarationSubmitted.emit(payload);
  }

  // compatibilité si un ancien template appelait submit()
  submit(): void {
    this.submitDeclaration();
  }
}