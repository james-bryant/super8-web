import './App.css'
import MqttForm from "./MqttForm.jsx";
import {useEffect, useState} from "react";
import LoginForm from "./LoginForm.jsx";

function App() {
    const [client, setClient] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [content, setContent] = useState((<LoginForm client={client} setClient={setClient} setIsConnected={setIsConnected}/>));
    const [topic, setTopic] = useState("");

    useEffect(() => {
        if (isConnected) {
            setContent((<MqttForm client={client} setIsConnected={setIsConnected} topic={topic}/>));
        } else {
            setContent(<LoginForm client={client} setClient={setClient} setIsConnected={setIsConnected} setTopic={setTopic}/>)
        }
    }, [isConnected, client, topic]);

    return (
        <>
            <h1>super8</h1>
            <h5>I2CoMQTT</h5>
            {content}
        </>
    )
}

export default App
