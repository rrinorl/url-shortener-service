import { Application } from 'express';

export { init };

function init(app: Application): void {
    app.use(require('./api.routes'));
    console.info('[api.index.init] Api handler initialized!');
}
