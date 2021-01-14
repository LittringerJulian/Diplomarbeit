import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private router: Router, private socket: WebsocketService) { }

  ngOnInit() {
    this.socket.connect("localhost")
  }

  enterPage(page){
    this.router.navigate(['/', page])
  }

}
