import React from "react";
import ReactDOM from "react-dom";
var Information = React.createClass({
	render: function(){
		return (
			<div>
				<div className="follow_me">
					<p>Follow me</p>
					<div className="tips">
						<a href="http://weibo.com/FightingNine" target="_blank">Sina</a>
						<a href="https://github.com/GoGoFighting" target="_blank">Github</a>
					</div>
				</div>
				<div className="about_me">
					<p>About me</p>
					<img src="" width="200" height="100" alt="me" />
					<ul>
						<li><a href="/about">About</a></li>
						<li><a href="/blogs">Blogs</a></li>
					</ul>
				</div>
			</div>
		);
	}
});
ReactDOM.render( 
	<Information /> ,
    document.getElementById('information')
);