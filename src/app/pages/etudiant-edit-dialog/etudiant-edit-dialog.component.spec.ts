import { ComponentFixture, TestBed } from '@angular/core/testing';

// @ts-ignore
import { EtudiantEditDialogComponent } from './etudiant-edit-dialog.component';

describe('EtudiantEditDialogComponent', () => {
  let component: EtudiantEditDialogComponent;
  let fixture: ComponentFixture<EtudiantEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtudiantEditDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtudiantEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
