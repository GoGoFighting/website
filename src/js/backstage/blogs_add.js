import React from "react";
import ReactDOM from "react-dom";
import blogsList from './blogs_list';
import $ from 'jquery';
let Blog = React.createClass({
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
        $.getJSON('/blog/add', {con: con, title: title}, function(data, status) {
            if(data && data.status){
                blogsList();
            }
        });
    },
    render: function() {
        return (
            <div>
                <p className="title">
                    New
                    <span className="icon iconfont icon-fanhui" onClick={blogsList} title="返回列表"></span>
                </p>
                <div className="form">
                    <p className="blog_title">标题:<input type="text" ref="title" className="blogTitle"/></p>
                    <p className="blog_content">内容: <span className="icon iconfont icon-gongyongzhixing" onClick={this.showContent} title="运行"></span></p>
                    <textarea className="blogContent" ref="content">
                    </textarea>
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
function render(){
   ReactDOM.render( 
        <Blog /> ,
        document.getElementById('content')
    ); 
}
export default render;

