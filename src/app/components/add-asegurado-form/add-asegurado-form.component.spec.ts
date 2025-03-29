import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAseguradoFormComponent } from './add-asegurado-form.component';

describe('AddAseguradoFormComponent', () => {
  let component: AddAseguradoFormComponent;
  let fixture: ComponentFixture<AddAseguradoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAseguradoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAseguradoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
