import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { retry, map, filter } from 'rxjs/operators';
import { Subscriber } from 'rxjs/internal/Subscriber';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {


  subscription: Subscription;

  constructor() {
    console.log('Se va a ejecutar el observador');

    this.subscription = this.regresaObservable().subscribe(
      numero => console.log('sub ', numero),
      error => console.log('Error en el obs', error),
      () => console.log('El observador Termino ')
    );

   }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    console.log('La pagina se va a cerrar');
    this.subscription.unsubscribe();
  }

  regresaObservable(): Observable<any> {
    return new Observable( (observer: Subscriber<any>) => {
      console.log('Entro al observador');

      let contador = 0;

      const intervalo = setInterval(() => {

        contador += 1;
        const salida = {
          valor: contador
        };

        observer.next(salida);

        // if (contador === 3) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }
        // if (contador === 2) {
        //   observer.error('Auxilio');
        // }

      }, 1000);
    }).pipe(
      map( resp => resp.valor),
      filter( (valor, index) => {
        if ( (valor % 2) === 1 ) {
          // impar
          return true;
        } else {
          return false;
        }
      })
    );
  }

}
