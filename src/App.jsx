import {useCallback, useEffect, useState} from 'react'
import './App.css'
import {Button, Form} from "react-bootstrap";
import mqtt from "mqtt";

function App() {
    const [count, setCount] = useState(0)
    const [client, setClient] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    const connectUrl = 'ws://localhost:9090/mqtt';

    const topic = "super8/test"
    const options = {
        // Clean session
        clean: true,
        connectTimeout: 4000,
        // Random client ID
        clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
        // Authentication (if required by your broker)
        username: 'uberfoo',
        password: 'super8',
    };

    const onSubmit = useCallback(async event => {
        if (event) event.preventDefault();

        // Publish a message to a topic
        const message = `Hello '${count}'`;
        setCount(count + 1);
        client.publish(topic, message, { qos: 0, retain: false }, (error) => {
            if (error) {
                console.error('Publish error:', error);
            } else {
                console.log(`Message '${message}' published to topic '${topic}'`);
            }
        });

    }, [client, count, setCount]);

    useEffect(() => {
        // Connect to the broker
        const mqttClient = mqtt.connect(connectUrl, options);
        setClient(mqttClient);

        return () => {
            // Cleanup function to disconnect the client when the component unmounts
            if (mqttClient) {
                mqttClient.end();
            }
        };
    }, []);

    useEffect(() => {
        if (client) {
            client.on('connect', () => {
                console.log('Connected to MQTT broker');
                setIsConnected(true);
            });
        }
    }, [client]);

    return (
        <>
            <h1>super8</h1>
            <div className="card">
                <Form onSubmit={onSubmit}>
                    <Button type="submit" variant="primary" disabled={!isConnected}>Button</Button>
                </Form>ds08057-X

            </div>
        </>
    )
}

export default App
