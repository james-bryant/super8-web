import './App.css'
import MqttForm from "./MqttForm.jsx";
import {useEffect, useState} from "react";
import LoginForm from "./LoginForm.jsx";
import Super8Logo from "./assets/Super8Firmware.png"

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
            <img src={Super8Logo} alt="super8" className="logo"/>
            <h5>I2CoMQTT</h5>
            {content}
            <a href="https://github.com/Aask42/Super8-Firmware" className="githublink">Firmware GitHub</a>
        </>
    )
}

export default App;
