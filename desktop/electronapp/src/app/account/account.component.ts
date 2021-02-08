import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(private dataService: DataService,private router: Router) { }

  ngOnInit() {
  }


  navigate(path) {
    this.router.navigate(['/' + path]);

  }
}
