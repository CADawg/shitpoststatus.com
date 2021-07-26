const hostname = window && window.location && window.location.hostname.toLowerCase();
const ENV = hostname === "localhost" ? "dev" : "production";

const CONFIGS = {
    dev: {
        endpoint: "http://localhost:7209"
    },
    production: {
        endpoint: ""
    }
}

function getConfigValue(name) {
    return (CONFIGS[ENV] || {})[name] || null;
}

function getConfig() {
    return CONFIGS[ENV] || null;
}

export { getConfigValue, getConfig }