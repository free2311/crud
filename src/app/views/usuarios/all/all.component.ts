import { Component, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';

import {
  ModalDismissReasons,
  NgbDatepickerModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrl: './all.component.scss',
})
export class AllComponent {
  constructor(private apiservice: ApiService, private modalService: NgbModal) {}
  userform = new FormGroup({
    usr_name: new FormControl(''),
    password: new FormControl(''),
    cedula: new FormControl(''),
    nombre: new FormControl(''),
    correo: new FormControl(''),
  });
  updateform = new FormGroup({
    usr_name: new FormControl(''),
    password: new FormControl(''),
    cedula: new FormControl(''),
    nombre: new FormControl(''),
    correo: new FormControl(''),
  });
  data: any = [];

  public visible = false;
  public visiblemodalupdate = false;

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.apiservice.get('usuariosall').subscribe(
      (res: any) => {
        console.log(res);
        this.data = res.data;
        this.data;
      },
      (error: any) => {
        console.log('error al traer usuarios', error);
      }
    );
  }

  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

  crearUsuario() {
    console.log(this.userform.value);

    this.apiservice.post('create', this.userform.value).subscribe(
      (res: any) => {
        this.visible = false;
        this.getData();
        console.log(res);
      },
      (error: any) => {
        console.log('error en el login', error);
      }
    );
  }

  delete(username: any) {
    console.log('delete', username);
    const body = { usr_name: username };
    this.apiservice.post('delete', body).subscribe(
      (res: any) => {
        console.log(res);
        this.getData();
      },
      (error: any) => {
        console.log('error en el login', error);
      }
    );
  }

  open(content: TemplateRef<any>, data: any) {
    console.log(data);

    this.updateform.patchValue({ usr_name: data.user });
    this.updateform.patchValue({ password: data.pass });
    this.updateform.patchValue({ cedula: data.cedula });
    this.updateform.patchValue({ nombre: data.nombre });
    this.updateform.patchValue({ correo: data.correo });

    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
    });
  }

  update() {
    this.apiservice.post('update', this.updateform.value).subscribe(
      (res: any) => {
        console.log(res);
        this.getData();
        this.modalService.dismissAll();
      },
      (error: any) => {
        console.log('error en el login', error);
      }
    );
  }
}
