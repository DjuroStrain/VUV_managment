import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddactivitiesComponent } from './addactivities.component';

describe('AddactivitiesComponent', () => {
  let component: AddactivitiesComponent;
  let fixture: ComponentFixture<AddactivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddactivitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddactivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
