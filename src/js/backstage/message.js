import React from "react";
import ReactDOM from "react-dom";
import $ from 'jquery';
import '../lib/date';
import blogMessage from './blog_message';
let Blog = React.createClass({
	getInitialState: function() {
        return {
            status: ''
        };
    },
	componentDidMount: function() {
		if(this.props.item.deleteTime === 0){
			this.setState({
				status: "未删除",
			});
		} else {
			this.setState({
				status: "已删除"
			});
		}
    },
    messages: function(){
		blogMessage(this.props.item.id);
    },
	render: function(){
		return (
			<tr width="100%">
				<td width="40%">{this.props.item.title}</td>
				<td width="25%">{this.props.item.time}</td>
				<td width="10%">{this.props.item.messages}</td>
				<td width="10%">{this.state.status}</td>
				<td width="15%">
					<span className="icon iconfont icon-liuyan" onClick={this.messages}></span>
				</td>
			</tr>
		);
	}
});
let Blogs = React.createClass({
	key: '',
	getInitialState: function() {
        return {
            data: []
        };
    },
	componentDidMount: function() {
		let _this = this;
		$.getJSON('/blog/getAll', function(data, status) {
            _this.setState({
                data: data.list
            });
        });
    },
    searchBlogs: function(){
        let _this = this;
        this.key = this.refs.key.value;
        if(this.key === ''){
            return;
        }
        $.getJSON('/blog/getAll', {key: this.key}, function(data, status) {
            _this.setState({
                data: data.list
            });
        });
    },
    render: function() {
    	let arr = [];
    	let _this = this;
        $.each(this.state.data, function(i, item) {
            item.time = new Date(item.createTime).pattern("yyyy-MM-dd HH:mm:ss");
            var key = item.id + new Date().getTime() + i;
        	arr.push(<Blog key={key} item={item}/>);
        });
        return (
        	<div>
        		<p className="title">
                    Catalog
                    <span className="search_blog">
                        <input type="text" className="search_box" ref="key" placeholder="关键词" />
                        <span className="icon iconfont icon-chaxun search_btn" onClick={this.searchBlogs}></span>
                    </span>
                </p>
                <table>
					<thead>
						<tr width="100%">
							<td width="40%">标题</td>
							<td width="25%">日期</td>
							<td width="10%">留言数</td>
							<td width="10%">状态</td>
							<td width="15%">操作</td>
						</tr>
					</thead>
					<tbody>
						{arr}
					</tbody>
				</table>
        	</div>
    	);        
    }
});
function render(){
	ReactDOM.render( 
		<Blogs /> ,
	    document.getElementById('content')
	);
}
export default render;