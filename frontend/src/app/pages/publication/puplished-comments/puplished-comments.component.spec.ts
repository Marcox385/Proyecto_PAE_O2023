import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuplishedCommentsComponent } from './puplished-comments.component';

describe('PuplishedCommentsComponent', () => {
  let component: PuplishedCommentsComponent;
  let fixture: ComponentFixture<PuplishedCommentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PuplishedCommentsComponent]
    });
    fixture = TestBed.createComponent(PuplishedCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
