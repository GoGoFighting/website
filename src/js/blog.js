import React from "react";
import ReactDOM from "react-dom";
import $ from 'jquery';
import './lib/information';
import './lib/date';
let getUrlParam = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
let Blogs = React.createClass({
    getInitialState: function() {
        return {
            data: []
        };
    },
    componentDidMount: function() {
        let _this = this;
        let id = getUrlParam('id');
        $.getJSON('/api/blog.do', {id: id}, function(data, status) {
            data[0].date = new Date(data[0].id).pattern("yyyy-MM-dd HH:mm:ss");
            _this.setState({
                data: data[0]
            });
            $('.blog_con').html('<div>' + data[0].con + '</div>');
        });
    },
    render: function() {
        return (
        	<div>
        		<p className='blog_title'>
                    {this.state.data.title}
                    <span>{this.state.data.date}</span>
                </p>
                <div className='blog_con'>
                </div>
        	</div>
    	);        
    }
});
ReactDOM.render( 
	<Blogs /> ,
    document.getElementById('blog')
);
