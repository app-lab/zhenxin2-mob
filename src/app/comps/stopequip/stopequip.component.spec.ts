import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StopequipComponent } from './stopequip.component';

describe('StopequipComponent', () => {
  let component: StopequipComponent;
  let fixture: ComponentFixture<StopequipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StopequipComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StopequipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
