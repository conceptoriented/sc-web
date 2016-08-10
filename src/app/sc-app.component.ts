import { Component /*, provide*/ } from '@angular/core';

import { ROUTER_DIRECTIVES } from '@angular/router';

import { HomeComponent } from './home.component';

import { ScRestService } from './sc-rest.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

require('node_modules/ng2-toastr/bundles/ng2-toastr.min.css');

@Component({
  //moduleId: module.id, // Not needed when using Webpack and also produces error in rc5
  selector: 'sc-app',
  templateUrl: 'sc-app.component.html',
  styleUrls: ['sc-app.component.css'],
  //directives: [HomeComponent], // Use it if a component will be included in html explicitly 
  directives: [ROUTER_DIRECTIVES], // Use it in the case of routing
  providers: [
    ScRestService,
    ToastsManager
  ]
})
export class ScAppComponent {
  title = 'DATA COMMANDR';
}
