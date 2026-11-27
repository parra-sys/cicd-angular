import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Counter } from './counter';

describe('Counter', () => {
  let fixture: ComponentFixture<Counter>;
  let el: HTMLElement;

  const click = async (selector: string) => {
    el.querySelector<HTMLButtonElement>(selector)!.click();
    await fixture.whenStable();
  };
  const shown = () => el.querySelector('.value')!.textContent!.trim();

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Counter] }).compileComponents();
    fixture = TestBed.createComponent(Counter);
    el = fixture.nativeElement as HTMLElement;
    await fixture.whenStable();
  });

  it('muestra 0 al inicio', () => {
    expect(shown()).toBe('0');
  });

  it('incrementa al pulsar +', async () => {
    await click('.inc');
    await click('.inc');
    expect(shown()).toBe('3');
  });

  it('no baja de 0 al pulsar -', async () => {
    await click('.dec');
    expect(shown()).toBe('0');
    await click('.inc');
    await click('.dec');
    expect(shown()).toBe('0');
  });

  it('se reinicia a 0', async () => {
    await click('.inc');
    await click('.reset');
    expect(shown()).toBe('0');
  });
});
