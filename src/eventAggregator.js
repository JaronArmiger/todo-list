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
  	return events.find(event => event.name === eventName);
  }

  const publish = (eventName, eventArgs) => {
  	let thisEvent = getEvent(eventName);
  	if (!thisEvent) {
  	  thisEvent = event(eventName);
  	  events.push(thisEvent);
  	}
  	thisEvent.fire(eventArgs);
  }

  const subscribe = (eventName, handler) => {
  	let thisEvent = getEvent(eventName);
  	if (!thisEvent) {
  	  thisEvent = event(eventName);
  	  events.push(thisEvent);
  	}

  	thisEvent.addHandler(handler);
  }

  const getArray = () => events;
  return {
  	publish, subscribe, getArray
  }
})();

export { eventAggregator }



