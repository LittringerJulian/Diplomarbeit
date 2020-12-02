import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { TagDialogComponent } from '../tag-dialog/tag-dialog.component';

@Component({
  selector: 'app-my-schemes',
  templateUrl: './my-schemes.component.html',
  styleUrls: ['./my-schemes.component.scss']
})
export class MySchemesComponent implements OnInit {

  array =[];
  previewArray = []
  SelectedSchemeId;
  

  constructor(private httpService: HttpService, private router: Router,public dialog: MatDialog) { }

  ngOnInit() {
    this.httpService.getSchemeByUserId().subscribe(data => {
      
      console.log(data);
      this.array = JSON.parse(data);
     for(let i = 0; i < this.array.length; i++){
        
      this.array[i].content=JSON.parse(this.array[i].content)
     }
    })
  }

  openTagDialog(item){
    let dialogRef = this.dialog.open(TagDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      
      if (result != undefined) {
        var json = {"schemeid": item._id,"tags":result};
        
        
        this.httpService.insertPublicScheme(json).subscribe(data => {

          console.log(data);
        })
      }

    })
  }

  
    
    
  

}
