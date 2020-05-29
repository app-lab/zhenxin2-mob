import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MypppoverComponent } from './mypppover.component';

describe('MypppoverComponent', () => {
  let component: MypppoverComponent;
  let fixture: ComponentFixture<MypppoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MypppoverComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MypppoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
