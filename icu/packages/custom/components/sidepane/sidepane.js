import {Component, Template, For} from 'angular2/angular2';

@Component({
    selector: 'sidepane'
})
@Template({
    url: 'components/sidepane/sidepane.html',
    directives: [For]
})
export class SidePane {
    constructor() {
        this.items = [{
            name: 'Tasks',
            active: false,
            icon: 'fa fa-3x fa-check-square'
        }, {
            name: 'Projects',
            active: false,
            icon: 'fa fa-3x fa-briefcase'

        }, {
            name: 'Meetings',
            active: false,
            icon: 'fa fa-3x fa-comments-o'

        }, {
            name: 'People',
            active: true,
            icon: 'fa fa-3x fa-user'
        }];

        this.clicked = function(item) {
            this.items.forEach((i) => {
                i.active = false;
            });

            item.active = true;
        }
    }
}
