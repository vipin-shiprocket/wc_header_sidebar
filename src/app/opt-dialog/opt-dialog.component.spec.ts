import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptDialogComponent } from './opt-dialog.component';

describe('OptDialogComponent', () => {
  let component: OptDialogComponent;
  let fixture: ComponentFixture<OptDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
