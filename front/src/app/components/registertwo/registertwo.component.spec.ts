import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistertwoComponent } from './registertwo.component';

describe('RegistertwoComponent', () => {
  let component: RegistertwoComponent;
  let fixture: ComponentFixture<RegistertwoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistertwoComponent]
    });
    fixture = TestBed.createComponent(RegistertwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
