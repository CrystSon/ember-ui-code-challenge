import Model, { attr } from '@ember-data/model';
import { action } from '@ember/object';

export default class UserModel extends Model {
  @attr('string') name;
  @attr('string') image;
  @attr('boolean', { defaultValue: false }) value;
  @attr('boolean', { defaultValue: false }) isArchived;

  @action
  changeValue() {
    this.value = true;
  }
}
