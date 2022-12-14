import Controller from '@ember/controller';
import { action } from '@ember/object';
import { task } from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';

export default class UsersUserController extends Controller {
  @tracked isShowingModal = false;

  get user() {
    return this.model;
  }

  @action
  onConfirmModal() {
    this.isShowingModal = false;
    this.onArchive.perform();
  }

  @action
  onDeclineModal() {
    this.isShowingModal = false;
  }

  @action
  onShowModal() {
    this.isShowingModal = true;
  }

  @task
  *onArchive() {
    this.user.isArchived = !this.user.isArchived;
    yield this.user.save();
  }
}
