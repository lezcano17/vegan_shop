import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../productos.model';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.scss']
})
export class CrearProductoComponent implements OnInit {

  formGroup!: FormGroup;
  @Output() newElement = new EventEmitter<Producto>();

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'codigo': [null, Validators.required],
      'nombre': [null, Validators.required],
      'precioVenta': [null, Validators.required],
      'existencia': [null, Validators.required]
    });

    
  }

  onSubmit() {
    const codigo = this.formGroup.value.codigo
    const nombre = this.formGroup.value.nombre
    const precioVenta = this.formGroup.value.precioVenta
    const existencia = this.formGroup.value.existencia
    this.newElement.emit(new Producto(codigo, nombre, precioVenta, existencia))
    
  }
}

