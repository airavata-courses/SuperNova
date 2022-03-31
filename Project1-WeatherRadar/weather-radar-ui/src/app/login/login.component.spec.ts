import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Shallow } from 'shallow-render';
import { AppModule } from '../app.module';
import { LoginComponent } from './login.component';

describe('Login Component', () => {
  let shallow: Shallow<LoginComponent>;

  beforeEach(() => {
    shallow = new Shallow(LoginComponent, AppModule)
    .replaceModule(BrowserAnimationsModule, NoopAnimationsModule);
  });

  it('creates', async () => {
    const { instance } = await shallow.render();
    expect(instance).toBeDefined();
  });
});
