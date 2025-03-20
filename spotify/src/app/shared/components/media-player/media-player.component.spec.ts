import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { MediaPlayerComponent } from './media-player.component';
import { MultimediaService } from '../../services/multimedia.service';

// Creamos un mock (simulación) del MultimediaService
class MockMultimediaService {
  audio = { muted: false };
  toggleMute = jasmine.createSpy('toggleMute');
}

describe('MediaPlayerComponent', () => {
  let component: MediaPlayerComponent;
  let fixture: ComponentFixture<MediaPlayerComponent>;
  let mockMultimediaService: MockMultimediaService;

  beforeEach(async () => {
    // Configuramos TestBed para usar el mock del servicio
    mockMultimediaService = new MockMultimediaService();

    await TestBed.configureTestingModule({
      declarations: [ MediaPlayerComponent ],
      // Proveemos el mock del servicio en lugar del servicio real
      providers: [
        { provide: MultimediaService, useValue: mockMultimediaService }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MediaPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe cambiar el estado de isMuted cuando se invoca muteUnmute', () => {
    // Estado inicial
    expect(component.isMuted).toBeFalse();
    // Primera llamada - Mute
    component.muteUnmute();
    expect(component.isMuted).toBeTrue();
    // Segunda llamada - Unmute
    component.muteUnmute();
    expect(component.isMuted).toBeFalse();
  });

  it('debe llamar a toggleMute del servicio MultimediaService cuando se invoca muteUnmute', () => {
    component.muteUnmute();
    // Verificamos que el método toggleMute del servicio haya sido llamado una vez
    expect(mockMultimediaService.toggleMute.calls.count()).toBe(1);
    // Llamamos nuevamente para verificar que se pueda llamar múltiples veces
    component.muteUnmute();
    expect(mockMultimediaService.toggleMute.calls.count()).toBe(2);
  });

  it('debe actualizar el icono del botón correctamente', () => {
    // Simulamos el click en el botón para mutear
    fixture.debugElement.query(By.css('.btn-media')).nativeElement.click();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.uil-volume-off'))).not.toBeNull();

    // Simulamos el click en el botón para desmutear
    fixture.debugElement.query(By.css('.btn-media')).nativeElement.click();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.uil-volume'))).not.toBeNull();
  });
});
