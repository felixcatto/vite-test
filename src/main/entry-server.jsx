import ReactDOMServer from 'react-dom/server';
import App from '../common/App';

export const render = url => ReactDOMServer.renderToString(<App />);
