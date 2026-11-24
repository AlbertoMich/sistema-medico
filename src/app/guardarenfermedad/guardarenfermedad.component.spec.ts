import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardarenfermedadComponent } from './guardarenfermedad.component';

describe('GuardarenfermedadComponent', () => {
  let component: GuardarenfermedadComponent;
  let fixture: ComponentFixture<GuardarenfermedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuardarenfermedadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuardarenfermedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
