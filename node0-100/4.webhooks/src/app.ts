import express from 'express'
import { envs } from './config';
import { GithubController } from './presentation/github/controller';
import { GithubSha256Middleware } from './presentation/middlewares/github-sha256middleware';
(() => {
    main()
})();

function main() {
    const app = express();
    app.use(express.json());

    const controller = new GithubController();
    app.use(GithubSha256Middleware.verifySignature);
    app.post('/api/github', controller.webhookHandler)

    app.listen(envs.PORT, () => {
        console.log(`App running on port ${envs.PORT}`)
    })
}