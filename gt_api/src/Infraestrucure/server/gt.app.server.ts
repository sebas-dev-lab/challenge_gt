import { MainConnectionAbstract } from './abstracts/main.abstrats';
import { WsConnectionAbstract } from './abstracts/ws.abstracts';
import { GetterAppConfigConnection } from './apps/getterapp/main.config';
import { GetterAppHttpConnection } from './apps/getterapp/main.http';
import { GetterAppHttpRoutes } from './apps/getterapp/main.routes';
import { connEnvs } from './envs/envs';
import { MainConnectionInterface } from './interfaces/connectiosn.interface';

class GetterAppMainConnection extends MainConnectionAbstract {}

const GetterAppServer: MainConnectionInterface = new GetterAppMainConnection({
    port: Number(connEnvs.server_port),
    http: new GetterAppHttpConnection(
        new GetterAppConfigConnection(new GetterAppHttpRoutes(), '/api')
    ),
    ws: new WsConnectionAbstract(),
    ws_options: {
        path: '/api/gateway'
    }
});
export default GetterAppServer;