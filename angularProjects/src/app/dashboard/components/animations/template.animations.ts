import { trigger, sequence, state,stagger, animate, transition, style, query, animateChild } from '@angular/animations';

export const blub =
  trigger('blub', [
    transition(':leave', [
      style({ background: 'pink'}),
      query('*', stagger(-150, [animateChild()]), { optional: true })
    ]),
  ]);
