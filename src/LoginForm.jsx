import {Button, Card, CardBody, Form} from "react-bootstrap";
import {useCallback, useEffect, useState} from "react";
import mqtt from "mqtt";
import PropTypes from "prop-types";

function LoginForm({client, setClient, setIsConnected, setTopic}) {
    const [connectionError, setConnectionError] = useState(null);
    const [options, setOptions] = useState({
        // Clean session
        clean: true,
        connectTimeout: 4000,
        // Random client ID
        clientId: '',
        // Authentication (if required by your broker)
        username: '',
        password: '',
    });

    const connectUrl = 'wss://aask.services:8000/mqtt';

    const onSubmit = useCallback((event) => {
        if (event) event.preventDefault();

        if (options.username && options.password) {
            // Connect to the broker
            const mqttClient = mqtt.connect(connectUrl, options);
            setClient(mqttClient);

            return () => {
                // Cleanup function to disconnect the client when the component unmounts
                if (mqttClient) {
                    mqttClient.end();
                }
            };
        }
        setClient(null);
    }, [options, setClient]);

    useEffect(() => {
        if (client) {
            client.on('connect', () => {
                console.log('Connected to MQTT broker');
                setIsConnected(true);
                setConnectionError(null);
            });
            client.on('error', (error) => {
                console.error('Connection failed:', error);
                setIsConnected(false);
                setConnectionError(error.message);
                client.end(); // Terminate the client if needed
            });
        }

    }, [client, setIsConnected, setConnectionError]);

    const usernameOnChange = (e) => {
        setOptions(prevState => ({
            ...prevState,
            username: e.target.value,
            clientId: e.target.value + '_' + Math.random().toString(16).substr(2, 8)
        }));
        setTopic("user/" + e.target.value);
    };

    const passwordOnChange = (e) => {
        setOptions(prevState => ({...prevState, password: e.target.value}));
    };

    return (
        <>
            <Form onSubmit={onSubmit}>
                <Form.Group>
                    <Form.Label column="sm">Username</Form.Label>
                    <Form.Control autoFocus
                                  value={options.username}
                                  onChange={usernameOnChange}
                                  placeholder="Enter username"
                                  type="text"/>

                </Form.Group>
                <Form.Group>
                    <Form.Label column="sm">Password</Form.Label>
                    <Form.Control
                        value={options.password}
                        onChange={passwordOnChange}
                        placeholder="Password"
                        type="password"
                        autoComplete="off"/>

                </Form.Group>

                <Button type="submit" variant="primary">Login</Button>
            </Form>
            <Card>
                <CardBody>
                    {connectionError && <p style={{ color: 'red' }}>Error: {connectionError}</p>}
                </CardBody>
            </Card>
        </>
    )
}

LoginForm.propTypes = {
    client: PropTypes.any,
    setClient: PropTypes.func,
    setIsConnected: PropTypes.func,
    setTopic: PropTypes.func,
}

export default LoginForm