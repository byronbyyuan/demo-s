
const cosmiconfig = require('cosmiconfig');
const configFinder = cosmiconfig('remoteMonitorServer');
import { get, set, defaultsDeep } from 'lodash';

const defaultConfig = {
    monitor: {
        screenshotInterval: 500,
    },
    control: {
        enable: true,
        log: true
    },
    server: {
        port: 3000
    }
}

let instance;

class Configuration {
    config: Object;
    constructor() {
        if(instance) {
           return instance;
        }
        const configFile = configFinder.searchSync();
        this.config = defaultsDeep({}, defaultConfig, configFile && configFile.config);
        instance = this;
    }

    static getInstance() {
        if (!instance) {
            instance = new Configuration();
        }
        return instance;
    }

    getConfig(name) {
        return name ? get(this.config, name) : this.config;
    }
    
    setConfig(name, val) {
        set(this.config, name, val);
    }
}

module.exports = Configuration;
