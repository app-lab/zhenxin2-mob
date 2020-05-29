import { TestBed } from '@angular/core/testing';

import { MywebsocketService } from './mywebsocket.service';

describe('MywebsocketService', () => {
  let service: MywebsocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MywebsocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
