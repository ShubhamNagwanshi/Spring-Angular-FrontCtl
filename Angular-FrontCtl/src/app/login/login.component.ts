import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../http-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
form: any = {
  data: {},
  message: '',
  inputerror:{}
}
constructor(private httpService: HttpServiceService, public router: Router, private route: ActivatedRoute){

}

ngOnInit(): void {
    this.route.queryParams.subscribe((params) =>{
      this.form.message = params['errorMessage'] || null;
      console.log('messsaggessgggg=>',this.form.message)
    });
}

signIn(){
  var self = this;
  this.httpService.post('http://localhost:8080/Auth/login',this.form.data, function(res:any){
    console.log('res =>', res)

    self.form.message = '';
    self.form.inputerror = {};

    if(res.result.message){
      self.form.message = res.result.inputerror;
    }

    if(!res.success){
      self.form.inputerror = res.result.inputerror;
    }

    if(res.success && res.result.data != null){
      localStorage.setItem('firstName', res.result.data.firstName)
      localStorage.setItem('roleName',res.result.data.roleName)
      localStorage.setItem('id', res.result.data.id)
      self.router.navigateByUrl('welcome')
    }
  })
}
signUp(){
  this.router.navigateByUrl('signup');
}
}
