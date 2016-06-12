import React from "react";
import ReactDOM from "react-dom";
import blogsList from './backstage/blogs_list';
import message from './backstage/message';
let Wrap = React.createClass({
    messages: function(){
        message();
    },
    componentDidMount: function() {
        blogsList();
    },
    render: function() {
        return (
            <div>
            	<h1>
                    Backstage
                    <a href="/" className="icon iconfont icon-home" title="Back Home" target="_blank"></a>
                </h1>
                <div className="wrap_left">
                    <div className="menu">
                        <ul>
                            <li onClick={blogsList}>日志管理</li>
                            <li onClick={message}>留言管理</li>
                        </ul>
                    </div>
                </div>
                <div className="wrap_right">
                    <div id="content">              
                    </div>
                </div>
            </div>
    	);        
    }
});
ReactDOM.render( 
	<Wrap /> ,
    document.getElementById('wrap')
);
