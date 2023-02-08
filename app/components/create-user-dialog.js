import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default class CreateUserDialogComponent extends Component {
    @tracked name;
    @service store;
    //   @service store;

    @task
    *saveUser() {
        const user = this.store.createRecord('user', {name: this.name});
        yield user.save();
        if (typeof this.args.closeDialog === "function") this.args.closeDialog();
    }
}
