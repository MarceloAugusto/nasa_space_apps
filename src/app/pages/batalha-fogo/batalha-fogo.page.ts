import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent, IonButton, IonHeader, IonToolbar, IonTitle
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';

type Question = { q: string; a: string[]; correct: number };

@Component({
  selector: 'app-batalha-fogo',
  standalone: true,
  imports: [CommonModule, IonContent, IonButton, IonHeader, IonToolbar, IonTitle],
  templateUrl: './batalha-fogo.page.html',
  styleUrls: ['./batalha-fogo.page.scss'],
})
export class BatalhaFogoPage {
  // === Sprites (coloque as imagens conforme seus arquivos)
  heroSrc    = 'assets/heroi-fazendeiro.png';
  villainSrc = 'assets/vilao-fogo.png';

  private router = inject(Router);

  // === Perguntas (como os dados da NASA ajudam a combater incêndios)
  questions: Question[] = [
   { q: 'Which NASA satellite helps monitor fire hotspots?',
    a: ['FIRMS', 'SMAP', 'GPM', 'MODIS'], correct: 0 },
  { q: 'What does FIRMS (Fire Information for Resource Management) provide?',
    a: ['Real-time data on wildfires', 'Soil moisture data', 'Weather forecasts', 'Solar radiation measurements'], correct: 0 },
  { q: 'Which data are used to monitor the extent of fire during burn events?',
    a: ['MODIS', 'NDVI', 'LST', 'GPM'], correct: 0 },
  { q: 'What is the impact of wildfires on agriculture?',
    a: ['Destruction of crops and soil', 'Increase in humidity', 'Improvement in soil quality', 'Increase in food production'], correct: 0 },
  { q: 'How does GPM (Global Precipitation Measurement) help fight wildfires?',
    a: ['By providing data on rainfall and humidity', 'By measuring soil temperature', 'By monitoring air pollutants', 'By calculating wind speed'], correct: 0 },
  ];

  // === Estado do jogo
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

    proximo(){
    this.router.navigateByUrl('/inicio-fogo');
  }
}
