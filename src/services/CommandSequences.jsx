const commandSequences = {
    "super8-petal": {
        "commandSeq1": [
            {
                "action": "i2c-write",
                "i2c-device": "super8-petal",
                "payload": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
            },
            {
                "action": "delay",
                "duration_ms": 100
            }
        ]
    }
}

export default commandSequences;