import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  formLogin = new FormGroup({
    usr_name: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private apiservice: ApiService, private router: Router) {}

  public login() {
    const loadingAlert: any = Swal.fire({
      title: 'Enviando Información...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    console.log(this.formLogin.value);

    this.apiservice.post('login', this.formLogin.value).subscribe(
      (res: any) => {
        loadingAlert.close();
        this.router.navigate(['usuarios/all']);
        console.log(res);
      },
      (error: any) => {
        console.log('error en el login', error);
        loadingAlert.close();
        this.errorMessage(error.error.msg);
      }
    );
  }

  errorMessage(texto: string) {
    return Swal.fire({
      icon: 'error',
      // title: 'Error',
      text: texto,
    });
  }
}
