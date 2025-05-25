import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostActionComponent } from './post-action.component';

describe('PostActionComponent', () => {
  let component: PostActionComponent;
  let fixture: ComponentFixture<PostActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostActionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
