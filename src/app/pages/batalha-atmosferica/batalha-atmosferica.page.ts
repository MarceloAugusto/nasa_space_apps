import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent, IonButton, IonHeader, IonToolbar, IonTitle
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';

type Question = { q: string; a: string[]; correct: number };

@Component({
  selector: 'app-batalha-atmosferica',
  standalone: true,
  imports: [CommonModule, IonContent, IonButton, IonHeader, IonToolbar, IonTitle],
  templateUrl: './batalha-atmosferica.page.html',
  styleUrls: ['./batalha-atmosferica.page.scss'],
})
export class BatalhaAtmosfericaPage {
  // === Sprites (coloque as imagens conforme seus arquivos)
  heroSrc    = 'assets/heroi-fazendeiro.png';
  villainSrc = 'assets/vilao-nuvem.png';

    private router = inject(Router);

  // === Perguntas (sobre como as nuvens afetam a produção agrícola)
  questions: Question[] = [
{ q: 'How does humidity in clouds affect agricultural production?',
  a: ['Decreases productivity', 'Increases productivity', 'Does not affect', 'Destroys the crops'], correct: 0 },
{ q: 'Which types of clouds indicate the possibility of heavy rain?',
  a: ['Cumulonimbus', 'Cirrus', 'Stratus', 'Cumulus'], correct: 0 },
{ q: 'The amount of clouds in the atmosphere can affect what in agriculture?',
  a: ['Solar radiation', 'Soil temperature', 'Wind', 'Rain'], correct: 0 },
{ q: 'Which data are used to monitor cloud density and its impact on agriculture?',
  a: ['LST and NDVI', 'Temperature and Wind Speed', 'Rainfall and Soil pH', 'Wind Speed and Humidity'], correct: 0 },
{ q: 'Which types of clouds are indicative of prolonged droughts?',
      a: ['Cirrostratus', 'Cumulus', 'Cumulonimbus', 'Stratus'], correct: 0 }
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

  maePoluicao(){
    this.router.navigateByUrl('/batalha-poluicao');
  }
}
