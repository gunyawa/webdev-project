import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllfoodComponent } from './allfood.component';

describe('AllfoodComponent', () => {
  let component: AllfoodComponent;
  let fixture: ComponentFixture<AllfoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllfoodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllfoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
