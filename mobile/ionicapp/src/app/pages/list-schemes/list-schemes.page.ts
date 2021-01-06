import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-list-schemes',
  templateUrl: './list-schemes.page.html',
  styleUrls: ['./list-schemes.page.scss'],
})
export class ListSchemesPage implements OnInit {

  constructor(private socket: WebsocketService, private router: Router) { }

  schemes = "nu nix"
  refresherEvent

  ngOnInit() {
    this.socket.receivedSchemes.subscribe(data => {
      this.schemes = data;

      if(this.refresherEvent)
      setTimeout(() => {
    this.refresherEvent.target.complete();
      }, 300)

    })

  }

  doRefresh(event) {
    this.refresherEvent = event
    console.log('Begin async operation');

    this.socket.sendData({"type": "requestSchemePush", "data": ""})
  }

  openScheme(selectedScheme) {
    let schemeState: NavigationExtras = {
      state: {
        scheme: selectedScheme
      }
    };
    this.router.navigate(['open-scheme'], schemeState);
  }

}
