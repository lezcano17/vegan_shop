import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../clientes.model';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.scss']
})
export class CrearClienteComponent implements OnInit {
  formGroup!: FormGroup;
  @Output() newElement = new EventEmitter<Cliente>();

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'ruc': [null, Validators.required],
      'nombreApellido': [null, Validators.required],
      'email': [null, Validators.required]
    });
  }

  onSubmit() {
    const ruc = this.formGroup.value.ruc
    const nombreApellido = this.formGroup.value.nombreApellido
    const email = this.formGroup.value.email
    this.newElement.emit(new Cliente(ruc, nombreApellido, email))

  }
}
