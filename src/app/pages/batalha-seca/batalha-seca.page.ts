import { Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent, IonButton, IonHeader, IonToolbar, IonTitle
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';

type Question = { q: string; a: string[]; correct: number };

@Component({
  selector: 'app-batalha-seca',
  standalone: true,
  imports: [CommonModule, IonContent, IonButton, IonHeader, IonToolbar, IonTitle],
  templateUrl: './batalha-seca.page.html',
  styleUrls: ['./batalha-seca.page.scss'],
})
export class BatalhaSecaPage implements OnDestroy {

  private router = inject(Router);

  // === Sprites (coloque os arquivos em src/assets/ e ajuste os nomes, se quiser)
  heroSrc    = 'assets/heroi-fazendeiro.png';
  villainSrc = 'assets/vila-seca.png';

  // === Perguntas (tema “seca” + dados NASA)
  questions: Question[] = [
{ q: 'Which satellite mission is used to estimate SOIL MOISTURE, crucial for monitoring droughts?',
  a: ['SMAP', 'FIRMS', 'GEDI', 'ICESat-2'], correct: 0 },
{ q: 'The NDVI mainly measures…',
  a: ['Vegetation vigor/biomass', 'Air temperature', 'Altitude', 'Wind speed'], correct: 0 },
{ q: 'FIRMS is useful because…',
  a: ['It shows heat/fire hotspots almost in real time', 'Calculates corn prices', 'Measures soil pH', 'Tracks tractors'], correct: 0 },
{ q: 'LST (Land Surface Temperature) helps detect…',
  a: ['Heat waves/thermal stress', 'Ocean salinity', 'Convective rainfall', 'Altitude'], correct: 0 },
{ q: 'During drought periods, the MOST efficient irrigation practice is:',
  a: ['Drip irrigation at night/early morning', 'Sprinkler irrigation at midday', 'Without monitoring humidity', 'Random short watering'], correct: 0 },
  ];

  // === Estado
  screen: 'start' | 'battle' | 'end' = 'start';
  round = 0;
  heroHP = 100;
  villainHP = 100;
  score = 0;
  time = 15;
  lock = false;
  selectedIndex: number | null = null; // índice clicado
  timerId: any;

  get total(): number { return this.questions.length; }
  get cur() { return this.questions[this.round]; }
  get progressPct(): number { return (this.round / this.total) * 100; }

  // === Fluxo
  startGame() {
    this.round = 0;
    this.heroHP = 100;
    this.villainHP = 100;
    this.score = 0;
    this.lock = false;
    this.selectedIndex = null;
    this.screen = 'battle';
    this.resetTimer();
  }

  handleAnswer(idx: number) {
    if (this.lock) return;
    this.lock = true;
    this.selectedIndex = idx;
    clearInterval(this.timerId);

    const isCorrect = idx === this.cur.correct;
    if (isCorrect) {
      this.score += Math.max(10, this.time);
      this.damage('villain', 25);
      if (navigator.vibrate) navigator.vibrate(40);
    } else {
      this.damage('hero', 25);
      if (navigator.vibrate) navigator.vibrate([60, 40, 60]);
    }
  }

  nextRound() {
    if (this.villainHP <= 0 || this.heroHP <= 0 || this.round >= this.total - 1) {
      this.endGame();
      return;
    }
    this.round++;
    this.lock = false;
    this.selectedIndex = null;
    this.resetTimer();
  }

  endGame() {
    clearInterval(this.timerId);
    this.screen = 'end';
  }

  skipMinus5s() {
    if (this.lock) return;
    this.time = Math.max(0, this.time - 5);
  }

  private resetTimer() {
    clearInterval(this.timerId);
    this.time = 15;
    this.timerId = setInterval(() => {
      this.time--;
      if (this.time <= 0) {
        clearInterval(this.timerId);
        // conta como erro por tempo
        this.handleAnswer(-1);
      }
    }, 1000);
  }

  private clamp(n: number, min: number, max: number) {
    return Math.min(Math.max(n, min), max);
  }

  private damage(who: 'hero' | 'villain', amount: number) {
    if (who === 'hero') {
      this.heroHP = this.clamp(this.heroHP - amount, 0, 100);
    } else {
      this.villainHP = this.clamp(this.villainHP - amount, 0, 100);
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.timerId);
  }

  lordNuvem(){
    this.router.navigateByUrl('/batalha-atmosferica');
  }


}
