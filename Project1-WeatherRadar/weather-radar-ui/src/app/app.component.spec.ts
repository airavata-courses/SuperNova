import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Shallow } from 'shallow-render';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

describe('App Component', () => {
  let shallow: Shallow<AppComponent>;

  beforeEach(() => {
    shallow = new Shallow(AppComponent, AppModule)
    .replaceModule(BrowserAnimationsModule, NoopAnimationsModule);
  });

  it('creates', async () => {
    const { instance } = await shallow.render();
    expect(instance).toBeDefined();
  });
});
