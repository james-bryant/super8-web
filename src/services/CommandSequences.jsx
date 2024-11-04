const commandSequences = {
    "super8-petal": {
        "type": "i2c",
        "i2c_address": 0,
        "commandSequences": {
            "Command Sequence 1": [
                {"action": "i2c-write-mem", "i2c-mem-addr": 9, "payload": [0]},
                {"action": "i2c-write-mem", "i2c-mem-addr": 10, "payload": [9]},
                {"action": "i2c-write-mem", "i2c-mem-addr": 11, "payload": [7]},
                {"action": "i2c-write-mem", "i2c-mem-addr": 12, "payload": [129]},
                {"action": "i2c-write-mem", "i2c-mem-addr": 13, "payload": [0]},
                {"action": "i2c-write-mem", "i2c-mem-addr": 14, "payload": [0]},
                {"action": "i2c-write-mem", "i2c-mem-addr": 15, "payload": [0]},
                {"action": "i2c-write-mem", "i2c-mem-addr": 2, "payload": [128]},
                {"action": "i2c-write-mem", "i2c-mem-addr": 3, "payload": [0]},
                {"action": "i2c-write-mem", "i2c-mem-addr": 4, "payload": [0]},
                {"action": "delay", "duration_ms": 200},
                {"action": "i2c-write-mem", "i2c-mem-addr": 2, "payload": [0]},
                {"action": "i2c-write-mem", "i2c-mem-addr": 3, "payload": [128]},
                {"action": "i2c-write-mem", "i2c-mem-addr": 4, "payload": [0]},
                {"action": "delay", "duration_ms": 200},
                {"action": "i2c-write-mem", "i2c-mem-addr": 2, "payload": [0]},
                {"action": "i2c-write-mem", "i2c-mem-addr": 3, "payload": [0]},
                {"action": "i2c-write-mem", "i2c-mem-addr": 4, "payload": [128]},
                {"action": "delay", "duration_ms": 200},
                {"action": "i2c-write-mem", "i2c-mem-addr": 2, "payload": [128]},
                {"action": "i2c-write-mem", "i2c-mem-addr": 3, "payload": [0]},
                {"action": "i2c-write-mem", "i2c-mem-addr": 4, "payload": [128]},
                {"action": "delay", "duration_ms": 200},
                {"action": "i2c-write-mem", "i2c-mem-addr": 2, "payload": [0]},
                {"action": "i2c-write-mem", "i2c-mem-addr": 3, "payload": [128]},
                {"action": "i2c-write-mem", "i2c-mem-addr": 4, "payload": [128]},
                {"action": "delay", "duration_ms": 200},
                {"action": "i2c-write-mem", "i2c-mem-addr": 2, "payload": [128]},
                {"action": "i2c-write-mem", "i2c-mem-addr": 3, "payload": [128]},
                {"action": "i2c-write-mem", "i2c-mem-addr": 4, "payload": [0]},
                {"action": "delay", "duration_ms": 200},
                {"action": "i2c-write-mem", "i2c-mem-addr": 2, "payload": [128]},
                {"action": "i2c-write-mem", "i2c-mem-addr": 3, "payload": [128]},
                {"action": "i2c-write-mem", "i2c-mem-addr": 4, "payload": [128]},
                {"action": "delay", "duration_ms": 200}
            ]
        }
    },
    "skull-of-fate-sao": {
        "type": "i2c",
        "i2c_address": 19,
        "commandSequences": {
            "Skull Change": [
                {"action": "i2c-write", "payload": [49, 255]}
            ]
        }
    }
}

export default commandSequences;