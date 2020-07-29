const event = (name) => {
  let _handlers = [];
  const addHandler = (handler) => {
  	_handlers.push(handler);
  }
  const removeHandler = (handler) => {
  	for (let i = 0; i < _handlers.length; i++) {
  	  if (_handlers[i] == handler) {
  	  	_handler.splice(i,1);
  	  	break;
  	  }
  	}
  }
  const fire = (eventArgs) => {
  	_handlers.forEach( h => {
  	  h(eventArgs);
  	})
  }
  return {
  	name, addHandler, removeHandler, fire
  }
} 

const eventAggregator = (() => {
  let events = [];

  const getEvent = (eventName) => {
  	return events.find()
  }
})();

const newEvent = event("touch-road");
newEvent.addHandler((string) => console.log(string));
newEvent.fire("SWV");





