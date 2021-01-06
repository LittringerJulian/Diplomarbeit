import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { HttpService } from '../http.service';
import { LoaderService } from '../loader/loader.service';
import { Scheme } from '../scheme';
import { TagDialogComponent } from '../tag-dialog/tag-dialog.component';

declare var electron: any;

@Component({
  selector: 'app-my-schemes',
  templateUrl: './my-schemes.component.html',
  styleUrls: ['./my-schemes.component.scss']
})
export class MySchemesComponent implements OnInit {

  array =[];
  previewArray = []
  SelectedSchemeId;
  tempScheme :Scheme;
  

  constructor(private httpService: HttpService,private dataService: DataService, 
    private router: Router,public dialog: MatDialog,private snackBar: MatSnackBar,public loaderService:LoaderService,private DataService: DataService) { }

  ngOnInit() {
    this.httpService.getSchemeByUserId().subscribe(data => {
      
      //console.log(data);
      this.array = JSON.parse(data);
      console.log(this.array)
     
    })
  }

  openTagDialog(item){
    let dialogRef = this.dialog.open(TagDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      
      if (result != undefined) {
        
        
        item.published=true;
        item.tags=result;
        
        
        console.log(item)
        this.httpService.updateScheme(item).subscribe(data => {

          if(data=="updated"){
              this.openSnackbar("Schme Published")
          }
          

        })
      }

    })
  }

  openSnackbar(Message){
    this.snackBar.open(Message, '', {
      duration: 3000,
      panelClass: ['simple-snack-bar']
    });
  }
  
    
    
  
    editScheme(item){
      this.dataService.editScheme = item;
      this.dataService.editFormat = "Landscape"
      //console.log(this.dataService.editScheme)
      this.router.navigate(['/editscheme']);

    }
    editSchemePortrait(item){
      this.dataService.editScheme = item;
      this.dataService.editFormat = "Portrait"
      //console.log(this.dataService.editScheme)
      this.router.navigate(['/editschemeportrait']);
    }

    logout() {
      localStorage.setItem('token', null)
      localStorage.setItem('imperiofname', null)
      localStorage.setItem('imperiolname', null)
      localStorage.setItem('imperioemail', null)
  
  
      //todo remove connections
      this.DataService.deviceArray = []
  
      electron.ipcRenderer.send("removeAllConnections");
  
  
      this.router.navigate(['/login']);
    }
    scheme() {
      this.router.navigate(['/scheme']);
    }
    myschemes() {
      this.router.navigate(['/myschemes']);
    }
    publicSchemes() {
      this.router.navigate(['/publicschemes']);
  
    }
    home(){
      this.router.navigate(['/main']);

    }

    navigate(path){
      this.router.navigate(['/'+path]);

    }

}
