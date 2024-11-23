import { Header } from './Header';
import { LongPollingTimer } from './LongPollingTimer';
import { SSETimer } from './SSETimer';
import { WebSockerTimer } from './WebSocketTimer';

export const Main = () => (
    <>
        <Header />
        <div className='grid grid-cols-3 gap-4 mx-8'>
            <LongPollingTimer />
            <WebSockerTimer />
            <SSETimer />
        </div>
    </>
);
