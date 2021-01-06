import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Scheme } from 'src/app/scheme';

@Component({
  selector: 'app-open-scheme',
  templateUrl: './open-scheme.page.html',
  styleUrls: ['./open-scheme.page.scss'],
})
export class OpenSchemePage implements OnInit {

  scheme: Scheme

  constructor(private route: ActivatedRoute, private router: Router) { 
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.scheme = this.router.getCurrentNavigation().extras.state.scheme;
      }
    });
  }

  ngOnInit() {
    // geht vllt
    //window.screen.orientation.lock('landscape');
  }

  getContainerRotation(){
    if(this.scheme.format.toLowerCase() == 'landscape'){
      return 'rotate(90deg)'
    }
    else{
      return 'rotate(0)'
    }
  }

  getContainerWidth(){
    if(this.scheme.format.toLowerCase() == 'landscape'){
      return '90 * 16 / 9'
    }
    else{
      return '90'
    }
  }

  getContainerHeight(){
    if(this.scheme.format.toLowerCase() == 'landscape'){
      return '90'
    }
    else{
      return '90 * 16 / 9'
    }
  }

}
