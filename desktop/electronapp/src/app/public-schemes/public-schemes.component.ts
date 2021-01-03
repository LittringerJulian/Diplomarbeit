import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { LoaderService } from '../loader/loader.service';
import { Scheme } from '../scheme';

@Component({
  selector: 'app-public-schemes',
  templateUrl: './public-schemes.component.html',
  styleUrls: ['./public-schemes.component.scss']
})
export class PublicSchemesComponent implements OnInit {
  array = [];
  constructor(private httpService: HttpService, private router: Router,private snackBar: MatSnackBar,private loaderService:LoaderService) { }

  tempScheme :Scheme;


  ngOnInit() {
    this.httpService.getPublicSchemes().subscribe(data => {
      
      this.array = JSON.parse(data);
      console.log(this.array)
     
    })
  }
  home(){
    this.router.navigate(['/qrcode']);
  }


  openSnackbar(Message){
    this.snackBar.open(Message, '', {
      duration: 3000,
      panelClass: ['simple-snack-bar']
    });
  }

  insertScheme(item:Scheme){
    console.log(item)
    this.tempScheme= item; 
    this.tempScheme.published=false;
    

    this.httpService.saveScheme(this.tempScheme).subscribe(data => {

      if(data=="Scheme inserted"){
        this.openSnackbar("Downlaoded Scheme")
        
      }
    })
  }
}
