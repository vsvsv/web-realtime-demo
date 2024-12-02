import { Header } from './components/Header';
import { LongPollingTimer } from './LongPollingTimer';
import { SSETimer } from './SSETimer';
import { WebSocketTimer } from './WebSocketTimer';
import { SocketIOTimer } from './SocketIOTimer';

export const Main = () => (
    <>
        <Header />
        <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-screen-xl xl:mx-auto gap-4 px-8'>
            <LongPollingTimer />
            <SSETimer />
            <WebSocketTimer />
            <SocketIOTimer />
        </div>
    </>
);
