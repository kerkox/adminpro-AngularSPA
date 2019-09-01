import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress', { static: false } ) txtProgress: ElementRef;
  @Input() leyenda: string = 'Leyenda';
  @Input() progreso: number = 50;

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {
    console.log('Leyenda', this.leyenda );
    console.log('Progreso', this.progreso );
  }

  ngOnInit() {
  }

  onChange(newValue: number ) {


    // console.log(elemHTML.value);
    if(newValue >= 100) {
      this.progreso = 100;
    } else if ( newValue <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = newValue;
    }
    // elemHTML.value = Number( this.progreso );
    this.txtProgress.nativeElement.value = this.progreso;
    this.cambioValor.emit(this.progreso);
  }

  cambiarValor(value: number) {
    if (this.progreso + value < 0) { return; }
    if (this.progreso + value > 100) { return; }

    this.progreso += value;
    this.cambioValor.emit(this.progreso);
    this.txtProgress.nativeElement.focus();
  }

}
