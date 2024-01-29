import App from './app';

const app = new App()
const port = 3030;

app.server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});