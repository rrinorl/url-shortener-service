import 'dotenv/config' //initializes dot env
import {createApp} from "./app";

(async ()=>{
    try {
        await start();
    }
    catch(err) {
        console.error({err}, 'Cannot start app.');
        process.exit(1);
    }
})()

async function start(){
    const app = await createApp();
    const port = process.env.PORT;

    if(!port) {
        console.error('Env variables not setup!');
        process.exit(1);
    }

    app.listen(port, () => {
        console.log(`server running on port ${port}`);
    });
}
