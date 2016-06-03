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
    limit: 10,
    key: '',
    getInitialState: function() {
        return {
            data: [],
            status: false
        };
    },
    componentDidMount: function() {
        let _this = this;
        $.getJSON('/api/blogs.do', {limit: this.limit}, function(data, status) {
            _this.setState({
                data: data.list,
                status: data.status
            });
        });
    },
    searchBlogs: function(){
        let _this = this;
        this.key = $('.search_box').val();
        this.limit = 10;
        $.getJSON('/api/blogs.do', {limit: this.limit, key: this.key}, function(data, status) {
            _this.setState({
                data: data.list,
                status: data.status
            });
        });
    },
    loadMore: function(){
        let _this = this;
        this.limit += 10;
        $.getJSON('/api/blogs.do', {limit: this.limit, key: this.key}, function(data, status) {
            _this.setState({
                data: data.list,
                status: data.status
            });
        });
    },
    render: function() {
        let arr = [];
        $.each(this.state.data, function(i, item) {
            item.url = '/blog?id=' + item.id;
            item.time = new Date(item.createTime).pattern("yyyy-MM-dd");
        	arr.push(<Blog key={i++} index={i++} item={item}/>);
        });
        let moreBlogs;
        if(this.state.status){
            moreBlogs = <span className="more_blogs" onClick={this.loadMore}>更多日志...</span>
        }
        console.log(moreBlogs)
        return (
        	<div>
        		<p className="blogs_title">
                    Catalog
                    <span className="search_blog">
                        <input type="text" className="search_box" placeholder="关键词" />
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
