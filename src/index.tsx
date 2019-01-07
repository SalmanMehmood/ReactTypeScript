import { lightBaseTheme, MuiThemeProvider } from "material-ui/styles";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';



const lightMuiTheme:any = getMuiTheme(lightBaseTheme);

ReactDOM.render(  
<MuiThemeProvider muiTheme={lightMuiTheme}>
  <App/>
</MuiThemeProvider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
