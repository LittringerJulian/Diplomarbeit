import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-open-scheme',
  templateUrl: './open-scheme.component.html',
  styleUrls: ['./open-scheme.component.scss']
})
export class OpenSchemeComponent implements OnInit {

  array =[];
  SchemeId : String;

  constructor(private httpService: HttpService) { }

  ngOnInit() {
  }


  openScheme(){
    var json = {"id": this.SchemeId};

    this.httpService.getScheme(json).subscribe(data => {
      this.array=JSON.parse(data);
      console.log(data);
    })
    //console.log(json)
  }
}
