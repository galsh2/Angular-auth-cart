import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogintwoComponent } from './logintwo.component';

describe('LogintwoComponent', () => {
  let component: LogintwoComponent;
  let fixture: ComponentFixture<LogintwoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogintwoComponent]
    });
    fixture = TestBed.createComponent(LogintwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
