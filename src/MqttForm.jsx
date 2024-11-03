import {Button, Card, Form} from "react-bootstrap";
import React, {useCallback, useEffect} from "react";
import PropTypes from "prop-types";
import {mqttService} from "./services/MqttService.jsx";
import commandSequences from "./services/CommandSequences.jsx";
import Select from "react-select";

function MqttForm({client, setIsConnected, topic}) {
    const [deviceName, setDeviceName] = React.useState("");
    const [commandForms, setCommandForms] = React.useState([]);
    const onSubmit = useCallback(event => {
        if (event) event.preventDefault();

        // Publish a message to a topic
        mqttService.send(client, topic, "super8-petal", "commandSeq1");

    }, [client, topic]);

    const onLogout = useCallback(event => {
        if (event) event.preventDefault();

        if (client) {
            client.end();
            setIsConnected(false);
        }
    }, [client, setIsConnected]);

    const onSelect = useCallback((option) => {
        console.log(option.value);
        setDeviceName(option.value);
        let list = [];
        for (let key in commandSequences[option.value]) {
            list.push((
                <Form onSubmit={onSubmit} id={key} key={key}>
                    <Button type="submit" variant="primary">{key}</Button>
                </Form>
            ));
        }
        setCommandForms(list);
    }, [onSubmit]);

    const devices = [];

    for (let key in commandSequences) {
        devices.push({value: key, label: key});
    }

    return (
        <>
            <Select options={devices} onChange={onSelect}/>
            <Card hidden={!commandForms}>
                {commandForms}
            </Card>
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
};

export default MqttForm;