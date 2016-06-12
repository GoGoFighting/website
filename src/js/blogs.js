import React from "react";
import ReactDOM from "react-dom";
import $ from 'jquery';
import './lib/information';
import './lib/date';
let Blog = React.createClass({
	render: function(){
		return (
			<a href={this.props.item.url} className="blog" title={this.props.item.title}>
				<span className="blog_title">
					{this.props.item.title}
				</span>
                <span className="blog_time">{this.props.item.time}</span>
			</a>
		);
	}
});
let Blogs = React.createClass({
    limit: 15,
    key: '',
    getInitialState: function() {
        return {
            data: [],
            status: false
        };
    },
    componentDidMount: function() {
        let _this = this;
        $.getJSON('/blog/get', {limit: this.limit}, function(data, status) {
            _this.setState({
                data: data.list,
                status: data.status
            });
        });
    },
    searchBlogs: function(){
        let _this = this;
        this.key = this.refs.key.value;
        this.limit = 15;
        if(this.key === ''){
            return;
        }
        $.getJSON('/blog/get', {limit: this.limit, key: this.key}, function(data, status) {
            _this.setState({
                data: data.list,
                status: data.status
            });
        });
    },
    loadMore: function(){
        let _this = this;
        this.limit += 15;
        $.getJSON('/blog/get', {limit: this.limit, key: this.key}, function(data, status) {
            _this.setState({
                data: data.list,
                status: data.status
            });
        });
    },
    render: function() {
        let arr = [];
        let _this = this;
        $.each(this.state.data, function(i, item) {
            item.url = '/blog?id=' + item.id;
            item.time = new Date(item.createTime).pattern("yyyy-MM-dd");
            let key = _this.key + new Date().getTime + i;
        	arr.push(<Blog key={key} item={item}/>);
        });
        let moreBlogs;
        if(this.state.status){
            moreBlogs = <span className="more_blogs" onClick={this.loadMore}>更多日志...</span>
        }
        return (
        	<div>
        		<p className="blogs_title">
                    Catalog
                    <span className="search_blog">
                        <input type="text" className="search_box" ref="key" placeholder="关键词" />
                        <span className="icon iconfont icon-chaxun search_btn" onClick={this.searchBlogs}></span>
                    </span>
                </p>
                <div className="blogs_menu">
    		        {arr}
                </div>
                {moreBlogs}
        	</div>
    	);        
    }
})
ReactDOM.render( 
	<Blogs /> ,
    document.getElementById('blogs')
);
