import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectNamesComponent } from './select-names.component';

describe('SelectNamesComponent', () => {
  let component: SelectNamesComponent;
  let fixture: ComponentFixture<SelectNamesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectNamesComponent]
    });
    fixture = TestBed.createComponent(SelectNamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
