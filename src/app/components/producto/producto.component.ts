import { Component, Input, OnInit } from '@angular/core';
import { Productos } from 'src/app/models/productos';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
})
export class ProductoComponent implements OnInit {

  @Input() producto: Productos;

  constructor() { }

  ngOnInit() {
    console.log(this.producto);
  }

}
