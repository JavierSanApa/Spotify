import { Component, ElementRef } from '@angular/core';
import { ImgBrokenDirective } from './img-broken.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

//TODO: Componente de prueba
@Component({
  template: '<img class = "testing-directive" appImgBroken [src]="srcMock" >'
})

class TestComponent {
  public srcMock: any = null
}

//TODO: La prueba de ImgBroken es la siguiente:
describe('ImgBrokenDirective', () => {

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        ImgBrokenDirective
      ]
    })

    fixture = TestBed.createComponent(TestComponent)
    component = fixture.componentInstance
    fixture.detectChanges()

  })

  //TODO: Debería instanciar correctamente
  it('should create an instance', () => {
    const mockElement = new ElementRef('');
    const directive = new ImgBrokenDirective(mockElement);
    expect(directive).toBeTruthy();
  });

  it('😉😉 TestComponent debería inistanciarse correctamente', () => {
    expect(component).toBeTruthy()
  });

  it('😁😉 Directiva debería cambiar la imagen por un base64', (done: DoneFn) => {
    //TODO: Arrange
    const beforeImgElement = fixture.debugElement.query(By.css('.testing-directive')).nativeElement
    const beforeImgSrc = beforeImgElement.src //TODO: 👉 Tenemos la url antes de ser cambiada por la directiva
    component.srcMock = undefined

    setTimeout(() => {
      const afterImgElement = fixture.debugElement.query(By.css('.testing-directive')).nativeElement
      const afterImgSrc = afterImgElement.src //TODO: 👉 Tenemos la url antes de ser cambiada por la directiva
      expect(afterImgSrc).toMatch(/\bdata:image\b/)//TODO: data:image 10101010101
      done()

    },3000)


  });

});
