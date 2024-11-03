import {v4 as uuidv4} from 'uuid';
import commandSequences from "./CommandSequences.jsx";

const packageName = import.meta.env.PACKAGE_NAME;
const packageVersion = import.meta.env.PACKAGE_VERSION;

const send = (client, topic, deviceName, commandSeqId) => {
    const id = uuidv4();
    const message = {
        id: id,
        timestamp: new Date().toISOString(),
        generator: `${packageName}:${packageVersion}`,
        commands: commandSequences[deviceName][commandSeqId],
    }
    const messageStr = JSON.stringify(message);
    client.publish(topic, messageStr, {qos: 0, retain: false}, (error) => {
        if (error) {
            console.error('Publish error:', error);
        } else {
            console.log(`Message '${messageStr}' published to topic '${topic}'`);
        }
    });
}

export const mqttService = {
    send,
}