// Library

// ---- callback hooks

ackordion.addCallbackForEvent('init', function(eventName, accordion) {
  console.log('init: ' + accordion.id);
});
ackordion.addCallbackForEvent('beforeopen', function(eventName, accordion, item) {});
ackordion.addCallbackForEvent('beforeclose', function(eventName, accordion, item) {});

// ---- init 

ackordion.init('ackordion-1');

ackordion.init({
  id: 'ackordion-2',
  closeHeight: '32px',
  duration: '300ms',
});

ackordion.init({
  id: 'ackordion-3',
  duration: '500ms',
});

ackordion.init({
  id: 'ackordion-4',
  autoClosePrevious: false,
  transition: 'max-height 300ms cubic-bezier(.27,.82,.29,.84)',
});

// Custom other script
if (window.FastClick)
  FastClick.attach(document.body);