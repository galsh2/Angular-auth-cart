import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogouttwoComponent } from './logouttwo.component';

describe('LogouttwoComponent', () => {
  let component: LogouttwoComponent;
  let fixture: ComponentFixture<LogouttwoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogouttwoComponent]
    });
    fixture = TestBed.createComponent(LogouttwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
