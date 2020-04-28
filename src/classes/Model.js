export default class Model {
  constructor() {
    this._menuMusicOn = true;
    this._gameMusicOn = true;
    this._menuMusicPlaying = false;
    this._gameMusicPlaying = false;
  }
  set menuMusicOn(value) {
    this._menuMusicOn = value;
  }

  get menuMusicOn() {
    return this._menuMusicOn;
  }

  set gameMusicOn(value) {
    this._gameMusicOn = value;
  }

  get gameMusicOn() {
    return this._gameMusicOn;
  }

  set menuMusicPlaying(value) {
    this._menuMusicPlaying = value;
  }

  get menuMusicPlaying() {
    return this._menuMusicPlaying;
  }

  set gameMusicPlaying(value) {
    this._gameMusicPlaying = value;
  }

  get gameMusicPlaying() {
    return this._gameMusicPlaying;
  }
}
