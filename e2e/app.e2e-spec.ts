import { AudioPlayerPage } from './app.po';

describe('audio-player App', function() {
  let page: AudioPlayerPage;

  beforeEach(() => {
    page = new AudioPlayerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
