import {Component, Template, bootstrap} from 'angular2/angular2';
import {SidePane} from 'components/sidepane/sidepane';

@Component({
    selector: 'icu'
})
@Template({
    url: 'app/app.html',
    directives: [SidePane]
})
class ICU {
    constructor() {
    }
}

bootstrap(ICU);
