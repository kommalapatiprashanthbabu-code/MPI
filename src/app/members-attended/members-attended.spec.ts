import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersAttended } from './members-attended';

describe('MembersAttended', () => {
  let component: MembersAttended;
  let fixture: ComponentFixture<MembersAttended>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MembersAttended]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembersAttended);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
