import React from "react";
import ReactDOM from "react-dom";
import blogsList from './blogs_list';
import $ from 'jquery';
let blog_id;
let Blog = React.createClass({
    getInitialState: function() {
        return {
            title: '',
            con: ''
        };
    },
    componentDidMount: function() {
        let _this = this;
        $.getJSON('/blog/getOne', {id: blog_id}, function(data, status) {
            data[0].date = new Date(data[0].createTime).pattern("yyyy-MM-dd HH:mm:ss");
            _this.setState({
                title: data[0].title,
                con: data[0].con
            });
        });
    },
    showContent: function(){
        let content = $(this.refs.content).val();
        $(this.refs.result).show();
        $(this.refs.resultContent).html('<div class="blog_con">' + content + '</div>');
    },
    submit: function(){
        let con = this.refs.content.value;
        let title = this.refs.title.value;
        if (con === ''|| title === '') {
            return;
        };
        $.getJSON('/blog/set', {con: con, title: title, id: blog_id}, function(data, status) {
            if(data && data.status){
                blogsList();
            }
        });
    },
    blogTitle: function(e){
        this.setState({title: e.target.value});
    },
    blogCon: function(e){
        this.setState({con: e.target.value});
    },
    render: function() {
        return (
            <div>
                <p className="title">
                    Set
                    <span className="icon iconfont icon-fanhui" onClick={blogsList} title="返回列表"></span>
                </p>
                <div className="form">
                    <p className="blog_title">标题:<input type="text" ref="title" className="blogTitle" value={this.state.title} onChange={this.blogTitle}/></p>
                    <p className="blog_content">内容: <span className="icon iconfont icon-gongyongzhixing" onClick={this.showContent} title="运行"></span></p>
                    <textarea className="blogContent" value={this.state.con} ref="content" onChange={this.blogCon}></textarea>
                    <span className="submit" onClick={this.submit}>提交</span>
                </div>
                <p className="title content_result" ref="result">
                    Result
                </p>
                <div className="show_content" ref="resultContent"></div>
            </div>
    	);        
    }
});
function render(id){
    blog_id = id;
    ReactDOM.render( 
        <Blog /> ,
        document.getElementById('content')
    )
}
export default render;
