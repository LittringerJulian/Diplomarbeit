import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { DataService } from '../data.service';
import { HttpService } from '../http.service';
import { Scheme } from '../scheme';
import { Element } from '../element';


@Component({
  selector: 'app-edit-scheme',
  templateUrl: './edit-scheme.component.html',
  styleUrls: ['./edit-scheme.component.scss']
})
export class EditSchemeComponent implements OnInit {
  elementArray :Scheme;
  constructor(private route: ActivatedRoute,private dataService: DataService,private httpService: HttpService,private router: Router) { }
  contentWidth;
  contentHeight;
  el: HTMLElement
  elementWidth = 10;
  elementHeight = 10;
  format : String;

  ngOnInit() {
    this.elementArray= this.dataService.editScheme;
    this.format = this.dataService.editFormat;


    /*this.el = document.getElementById('scheme');
    this.contentHeight = this.el.offsetHeight;
    this.contentWidth = this.el.offsetWidth;
    //console.log(this.contentHeight)

    
    //console.log(this.elementArray.content)

     for(let i=0;i<this.elementArray.content.length;i++){
       console.log(this.el.clientWidth);
       console.log(this.contentHeight);
       //console.log(this.elementArray.content[i].percentagex)


      this.elementArray.content[i].posx=this.elementArray.content[i].percentagex*this.contentWidth;
      this.elementArray.content[i].posy=this.elementArray.content[i].percentagey*this.contentHeight;



      //console.log(this.elementArray.content[i].posx)
     }*/

  }

  ngAfterViewInit(){
    setTimeout(()=>this.calculatePositions(),0)
   
  }

  home(){
    this.router.navigate(['/qrcode']);
  }

  saveScheme(){
    console.log(this.elementArray)
    this.httpService.updateScheme(this.elementArray).subscribe(data => {

      if(data=="updated"){
          //this.openSnackbar("Schme Published")
          console.log("updated")
      }
      

    })
  }


  addArray(identifier, specification) {

    this.elementArray.content.push(new Element(identifier, specification, this.contentWidth / 2, this.contentHeight / 2, (this.contentWidth / 2) / this.contentWidth, (this.contentHeight / 2) / this.contentHeight, this.elementWidth, this.elementHeight))

    //console.log(this.array[0])
    //console.log(this.array[1])

    /*console.log(this.contentHeight )
    this.el = document.getElementById('snavcontent');
    this.contentHeight=this.el.offsetHeight;
    console.log(this.contentHeight )*/
   


  }

  calculatePositions(){
    this.el = document.getElementById('scheme');
    this.contentHeight = this.el.offsetHeight;
    this.contentWidth = this.el.offsetWidth;
    //console.log(this.contentHeight)

    this.elementArray= this.dataService.editScheme;
    //console.log(this.elementArray.content)

     for(let i=0;i<this.elementArray.content.length;i++){
       console.log(this.el.clientWidth);
       console.log(this.contentHeight);
       //console.log(this.elementArray.content[i].percentagex)


      this.elementArray.content[i].posx=this.elementArray.content[i].percentagex*this.contentWidth;
      this.elementArray.content[i].posy=this.elementArray.content[i].percentagey*this.contentHeight;


     }
  }

}
