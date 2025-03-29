import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AseguradosTableComponent } from './asegurados-table.component';

describe('AseguradosTableComponent', () => {
  let component: AseguradosTableComponent;
  let fixture: ComponentFixture<AseguradosTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AseguradosTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AseguradosTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
