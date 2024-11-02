import {Button, Form} from "react-bootstrap";
import {useCallback, useState} from "react";
import PropTypes from "prop-types";

function MqttForm({client, setIsConnected, topic}) {
    const [count, setCount] = useState(0)

    const onSubmit = useCallback(event => {
        if (event) event.preventDefault();

        // Publish a message to a topic
        const message = `Hello ${count}`;
        setCount(count + 1);

        client.publish(topic, message, {qos: 0, retain: false}, (error) => {
            if (error) {
                console.error('Publish error:', error);
            } else {
                console.log(`Message '${message}' published to topic '${topic}'`);
            }
        });
    }, [client, count, setCount, topic]);

    const onLogout = useCallback(event => {
        if (event) event.preventDefault();

        if (client) {
            client.end();
            setIsConnected(false);
        }
    }, [client, setIsConnected]);

    return (
        <>
            <Form onSubmit={onSubmit}>
                <Button type="submit" variant="primary" disabled={!client}>Button</Button>
            </Form>
            <Form onSubmit={onLogout}>
                <Button type="submit" variant="primary" disabled={!client}>Logout</Button>
            </Form>
        </>
    )
}

MqttForm.propTypes = {
    client: PropTypes.any,
    setIsConnected: PropTypes.func,
    topic: PropTypes.string,
}

export default MqttForm