import React from "react";
import ReactDOM from "react-dom";
import message from './message';
import $ from 'jquery';
import '../lib/date';
let blogId;
let Message = React.createClass({
	getInitialState: function() {
        return {
            status: '',
            btn: ''
        };
    },
	componentDidMount: function() {
		if(this.props.item.deleteTime === 0){
			this.setState({
				status: "未删除",
				btn: <span className="icon iconfont icon-delete" onClick={this.delete}></span>
			});
		} else {
			this.setState({
				status: "已删除",
				btn: <span className="icon iconfont icon-huifu" onClick={this.huifu}></span>
			});
		}
    },
    delete: function(){
    	let _this = this;
    	$.getJSON('/message/set', {isDelete: true, id: this.props.item.id, blogId: blogId, userName: this.props.item.userName}, function(data, status) {
            if(data && data.status){
                _this.setState({
					status: "已删除",
					btn: <span className="icon iconfont icon-huifu" onClick={_this.huifu}></span>
				});
            }
        });
    },
    huifu: function(){
    	let _this = this;
    	$.getJSON('/message/set', {isDelete: false, id: this.props.item.id, blogId: blogId, userName: this.props.item.userName}, function(data, status) {
            if(data && data.status){
                _this.setState({
					status: "未删除",
					btn: <span className="icon iconfont icon-delete" onClick={_this.delete}></span>
				});
            }
        });
    },
	render: function(){
		return (
			<tr width="100%">
				<td width="20%">{this.props.item.userName}</td>
				<td width="30%">{this.props.item.userEmail}</td>
				<td width="30%">{this.props.item.time}</td>
				<td width="10%">{this.state.status}</td>
				<td width="10%">
					{this.state.btn}
				</td>
			</tr>
		);
	}
});
let Messages = React.createClass({
	getInitialState: function() {
        return {
            data: [],
            title: ''
        };
    },
	componentDidMount: function() {
		let _this = this;
		$.getJSON('/message/getBlogMessage', {blogId: blogId}, function(data, status) {
            $.getJSON('/blog/getOne', {id: blogId}, function(blog, s) {
            	_this.setState({
	                data: data.list,
	                title: blog[0].title
	            });
            });
        });
    },
    render: function() {
    	let arr = [];
    	let _this = this;
        $.each(this.state.data, function(i, item) {
            item.time = new Date(item.createTime).pattern("yyyy-MM-dd HH:mm:ss");
            var key = blogId + new Date().getTime() + i;
        	arr.push(<Message key={key} item={item}/>);
        });
        return (
        	<div>
        		<p className="title">
                    {this.state.title}
                    <span className="icon iconfont icon-fanhui" onClick={message} title="返回列表"></span>
                </p>
                <table>
					<thead>
						<tr width="100%">
							<td width="30%">用户名</td>
							<td width="30%">邮箱</td>
							<td width="30%">日期</td>
							<td width="10%">状态</td>
							<td width="10%">操作</td>
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
function render(id){
	blogId = id;
	ReactDOM.render( 
		<Messages /> ,
	    document.getElementById('content')
	);
}
export default render;