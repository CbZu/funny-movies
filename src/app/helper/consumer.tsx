import ActionCable from 'actioncable';

const consumer = ActionCable.createConsumer('ws://localhost:3000/cable');

export default consumer;