import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AseguradoFormComponent } from './asegurado-form.component';

describe('AseguradoFormComponent', () => {
  let component: AseguradoFormComponent;
  let fixture: ComponentFixture<AseguradoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AseguradoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AseguradoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
