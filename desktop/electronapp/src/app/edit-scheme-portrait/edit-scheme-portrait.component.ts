import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { HttpService } from '../http.service';
import { Scheme } from '../scheme';
import { Element } from '../element';
import { Color } from 'ngx-color';
import { ColorEvent } from 'ngx-color';

@Component({
  selector: 'app-edit-scheme-portrait',
  templateUrl: './edit-scheme-portrait.component.html',
  styleUrls: ['./edit-scheme-portrait.component.scss']
})
export class EditSchemePortraitComponent implements OnInit {
  elementArray :Scheme;
  constructor(private route: ActivatedRoute,private dataService: DataService,private httpService: HttpService,private router: Router) { }
  contentWidth;
  contentHeight;
  el: HTMLElement
  elementWidth = 20;
  elementHeight = 20;
  format : String;
  selectedComponent: Element


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
    this.router.navigate(['/myschemes']);
  }

  selectComponent(e) {
    console.log(e)
    this.selectedComponent = e
  }

  changeColor($event: ColorEvent) {

    let color = $event.color
    this.selectedComponent.color = $event.color
    this.selectedComponent.rgbaColor = "rgba(" + color.rgb.r + "," + color.rgb.g + "," + color.rgb.b + "," + color.rgb.a + ")"
  }

  saveScheme(){
    console.log(this.elementArray)
    this.httpService.updateScheme(this.elementArray).subscribe(data => {

      if(data=="updated"){
        this.router.navigate(['/myschemes']);
      }
      

    })
  }


  addArray(identifier, specification) {

    let color: Color = { hex: "#FFFFFF", hsl: { a: 1, h: 314.70198675496687, l: 1, s: 0 }, hsv: { a: 1, h: 314.70198675496687, s: 0, v: 1 }, oldHue: 314.70198675496687, rgb: { r: 255, g: 255, b: 255, a: 1 }, source: "rgb" }
    let rgbaColor = "rgba(" + color.rgb.r + "," + color.rgb.g + "," + color.rgb.b + "," + color.rgb.a + ")"

    let e = new Element(identifier, specification, this.contentWidth / 2, this.contentHeight / 2, (this.contentWidth / 2) / this.contentWidth, (this.contentHeight / 2) / this.contentHeight, this.elementWidth, this.elementHeight, color, rgbaColor, [])
   

    this.dataService.editScheme.content.push(e)

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