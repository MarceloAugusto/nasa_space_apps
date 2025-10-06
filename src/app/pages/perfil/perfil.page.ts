import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

type Preset = {
  speed: number;
  spawnRate: number;
  lives: number;
  damageMultiplier: number;
  scoreMultiplier: number;
  powerupFrequency: number;
};

@Component({
  selector: 'app-perfil',
  standalone: true,
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class PerfilPage implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  form!: FormGroup;

  presets: Record<'facil' | 'medio' | 'dificil', Preset> = {
    facil:  { speed: 0.85, spawnRate: 1.10, lives: 5, damageMultiplier: 0.7, scoreMultiplier: 0.9, powerupFrequency: 1.2 },
    medio:  { speed: 1.00, spawnRate: 1.00, lives: 3, damageMultiplier: 1.0, scoreMultiplier: 1.0, powerupFrequency: 1.0 },
    dificil:{ speed: 1.20, spawnRate: 0.85, lives: 2, damageMultiplier: 1.3, scoreMultiplier: 1.2, powerupFrequency: 0.8 }
  };

  ngOnInit(): void {
    this.form = this.fb.group({
      age: [null, [Validators.required, Validators.min(3), Validators.max(120)]],
      difficulty: ['medio', [Validators.required]],
    });

    // Pré-preenche de localStorage, se existir:
    try {
      const saved = JSON.parse(localStorage.getItem('spaceGame.profile') || '{}');
      if (saved?.age) this.form.patchValue({ age: saved.age });
      if (saved?.difficulty) this.form.patchValue({ difficulty: saved.difficulty });
    } catch { /* ignore */ }
  }

  // Limita a 3 dígitos (equivalente ao slice no JS original)
  onAgeInput(ev: Event) {
    const input = ev.target as HTMLInputElement;
    if (input.value.length > 3) {
      input.value = input.value.slice(0, 3);
      this.form.get('age')?.setValue(Number(input.value));
    }
  }

  get ageError(): string {
    const c = this.form.get('age');
    if (!c || !c.touched && !c.dirty) return '';
    if (c.hasError('required')) return 'Informe uma idade entre 3 e 120.';
    if (c.hasError('min')) return 'Idade mínima: 3 anos.';
    if (c.hasError('max')) return 'Idade máxima: 120 anos.';
    return '';
  }

  goBack() {
    // Volta para a Home do seu app
    this.router.navigateByUrl('/home');
  }

  goLoading() {
     this.router.navigateByUrl('/loading');
  }

  // onSubmit() {
  //   if (this.form.invalid) {
  //     this.form.markAllAsTouched();
  //     return;
  //   }

  //   this.router.navigateByUrl('/loading');

  //   const age = Math.max(3, Math.min(120, Number(this.form.value.age)));
  //   const difficulty = this.form.value.difficulty as 'facil' | 'medio' | 'dificil';
  //   const profile = {
  //     age,
  //     difficulty,
  //     preset: this.presets[difficulty],
  //     createdAt: new Date().toISOString()
  //   };

  //   try {
  //     localStorage.setItem('spaceGame.profile', JSON.stringify(profile));
  //   } catch { /* ignore */ }

  //   // Navega para a próxima tela. Ajuste a rota se você tiver /jogo.
  //   const next = sessionStorage.getItem('spaceGame.next') || '/home'; // ex.: '/jogo'
  //   this.router.navigateByUrl(next);
  // }
}
