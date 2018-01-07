import { AppPage } from './app.po';

describe('helix report App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display graph title', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('last 7 days');
  });
});
