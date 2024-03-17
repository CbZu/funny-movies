import ActionCable from 'actioncable';
import { WS_CABEL } from "../constants";

const consumer = ActionCable.createConsumer(WS_CABEL);

export default consumer;