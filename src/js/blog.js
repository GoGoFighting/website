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
let Message = React.createClass({
    componentDidMount: function() {
        $(this.refs.messageContent).html('<div>' + this.props.item.content + '</div>')
    },
    render: function(){
        return (
            <div className="oneMessage">
                <p className="mUser">
                    {this.props.item.userName} <span>说：</span>
                </p>
                <div className="mContent" ref="messageContent">
                </div>
                <p className="mTime">{this.props.item.createTime}</p>
            </div>
        );
    }
});
let Messages = React.createClass({
    isEmail: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
    blogId: getUrlParam('id'),
    limit: 20,
    getInitialState: function() {
        return {
            data: [],
            status: false,
            number: 0
        };
    },
    componentDidMount: function() {
        let _this = this;
        $.getJSON('/message/get', {limit: this.limit, blogId: this.blogId}, function(data, status) {
            _this.setState({
                data: data.list,
                status: data.status,
                number: data.number
            });
        });
        if (localStorage.fighting_un) {
            this.refs.userName.value = localStorage.fighting_un;
            this.refs.userEmail.value = localStorage.fighting_ue;
            this.refs.remember.checked = true;
        };
    },
    updateMessage: function(){
        let _this = this;
        this.limit = 20;
        $.getJSON('/message/get', {limit: this.limit, blogId: this.blogId}, function(data, status) {
            _this.setState({
                data: data.list,
                status: data.status,
                number: data.number
            });
        });
    },
    showError: function(){
        if(this.refs.messageContent.value === ''){
            this.refs.errorMc.innerHTML = '请填写您的看法!'
        }
        if(this.refs.userName.value === ''){
            this.refs.errorUn.innerHTML = '请填写您的大名!'
        }
        if(!this.isEmail.test(this.refs.userEmail.value)){
            this.refs.errorUe.innerHTML = '请填写正确的邮箱!'
        }
    },
    submitMessage: function(){
        let _this = this;
        this.showError();
        if(this.refs.messageContent.value === ''){
            return;
        }
        if(this.refs.userName.value === ''){
            return;
        }
        if(!this.isEmail.test(this.refs.userEmail.value)){
            return;
        }
        let message = {
            blogId: this.blogId,
            content: this.refs.messageContent.value,
            userName: this.refs.userName.value,
            userEmail: this.refs.userEmail.value
        };
        $.getJSON('/message/add', message, function(data, status) {
            if(data && data.status){
                _this.updateMessage();
            }
        });
        if (this.refs.remember.checked){
            localStorage.fighting_un = this.refs.userName.value;
            localStorage.fighting_ue = this.refs.userEmail.value;
        } else{
            localStorage.removeItem("fighting_un");
            localStorage.removeItem("fighting_ue");
        }
    },
    remenber: function(){
        if (!this.refs.remember.checked){
            localStorage.removeItem("fighting_un");
            localStorage.removeItem("fighting_ue");
        }

    },
    messageContentChange: function(){
        if(this.refs.messageContent.value === ''){
            this.refs.errorMc.innerHTML = '请填写您的看法!'
        } else{
            this.refs.errorMc.innerHTML = ''
        }
    },
    userNameChange: function(){
        if(this.refs.userName.value === ''){
            this.refs.errorUn.innerHTML = '请填写您的大名!'
        } else{
            this.refs.errorUn.innerHTML = ''
        }
    },
    userEmailChange: function(){
        if(!this.isEmail.test(this.refs.userEmail.value)){
            this.refs.errorUe.innerHTML = '请填写正确的邮箱!'
        } else{
            this.refs.errorUe.innerHTML = ''
        }
    },
    loadMore: function(){
        let _this = this;
        this.limit += 20;
        $.getJSON('/message/get', {limit: this.limit, blogId: this.blogId}, function(data, status) {
            _this.setState({
                data: data.list,
                status: data.status,
                number: data.number
            });
        });
    },
    render: function(){
        let arr = [];
        $.each(this.state.data, function(i, item){
            item.createTime = new Date(item.createTime).pattern("yyyy-MM-dd HH:mm");
            let key = item.userName + new Date().getTime() + i;
            arr.push(<Message key={key} item={item}/>);
        });
        if(this.state.data.length === 0){
            arr = <p className="noMessages">暂无留言</p>;
        }
        let moreMessages;
        if(this.state.status){
            moreMessages = <span className="moreMessages" onClick={this.loadMore}>更多留言...</span>
        }
        return (
            <div>
                <div className="message">
                    <h3>留言({this.state.number})</h3>
                    <div className="message_list">
                        {arr}
                        {moreMessages}
                    </div>
                </div>
                <div className="message_form">
                    <h3>发表看法</h3>
                    <div className="message_con">
                        <p>您的留言 （HTML标签部分可用）<span ref="errorMc"></span></p>
                        <textarea ref="messageContent" onChange={this.messageContentChange}></textarea>
                    </div>
                    <div className="user_name">
                        <p>您的大名：</p>
                        <input type="text" ref="userName" onChange={this.userNameChange} />
                        <span>必填</span>
                        <span ref="errorUn"></span>
                    </div>
                    <div className="user_email">
                        <p>您的邮箱：</p>
                        <input type="text" ref="userEmail" onChange={this.userEmailChange} />
                        <span>必填</span>
                        <span ref="errorUe"></span>
                    </div>
                    <div className="remember">
                        <p>记住个人信息<input type="checkbox" ref="remember" onClick={this.remenber} /></p>
                    </div>
                    <span className="submit" onClick={this.submitMessage}>提交</span>
                </div>
            </div>
        );
    }
});
let Blog = React.createClass({
    id: getUrlParam('id'),
    getInitialState: function() {
        return {
            data: []
        };
    },
    componentDidMount: function() {
        let _this = this;
        $.getJSON('/blog/getOne', {id: this.id}, function(data, status) {
            data[0].date = new Date(data[0].createTime).pattern("yyyy-MM-dd HH:mm:ss");
            _this.setState({
                data: data[0]
            });
            document.title = data[0].title + " -- Tong Xu's Personal Website";
            $(_this.refs.content).html('<div>' + data[0].con + '</div>');
        });
    },
    render: function() {
        return (
        	<div>
        		<p className='blog_title'>
                    {this.state.data.title}
                    <span>{this.state.data.date}</span>
                </p>
                <div className='blog_con' ref="content">
                </div>
                <Messages/>
        	</div>
    	);        
    }
});
ReactDOM.render( 
	<Blog /> ,
    document.getElementById('blog')
);
