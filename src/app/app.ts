import { Component, signal } from '@angular/core';
import { Router, RouterOutlet, RouterLink  } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ship-rates');
}
