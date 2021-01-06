import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-open-scheme',
  templateUrl: './open-scheme.page.html',
  styleUrls: ['./open-scheme.page.scss'],
})
export class OpenSchemePage implements OnInit {

  scheme

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

}
