import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export class Home extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div>
            <h1>Welcome!</h1>
            <p>This is my single-page application (SPA), built with:</p>
            <ul>
                <li> <a href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>C#</a> and <a href='https://get.asp.net/'>ASP.NET</a> for cross-platform server-side code</li>
                <li><a href='https://facebook.github.io/react/'>React</a> for client-side code</li>
                <li><a href='http://getbootstrap.com/'>Bootstrap</a> as the CSS framework for layout and styling</li>
                <li><a href='https://www.microsoft.com/en-gb/sql-server/'>SQL Server</a></li>
                <li><a href='https://webpack.github.io/'>Webpack</a> for building and bundling client-side resources</li>
            </ul>
        </div>;
    }
}
