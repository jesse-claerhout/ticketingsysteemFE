const production = {
    url: {
        API_URL: 'https://wj95pwr37c.eu-west-1.awsapprunner.com/api/'
    }
};

const development = {
    url: {
        API_URL: 'http://localhost:8080/api'
    }
};

export const config = process.env.NODE_ENV === 'development' ? development : production;