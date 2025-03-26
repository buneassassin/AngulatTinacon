import Pusher from 'pusher-js';
import Echo from 'laravel-echo';

(window as any).Pusher = Pusher;

export const echo = new Echo({
  broadcaster: 'pusher',
  key: '040beb060369c1858a5a',
  cluster: 'us3',
  forceTLS: true,
});




