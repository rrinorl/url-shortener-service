import { Application } from 'express';
export { init };

async function init(app: Application): Promise<void> {
    app.use(require('./api.routes'));
    console.info('[api.index.init] Api handler initialized!');
}
