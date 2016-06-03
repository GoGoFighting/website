import React from "react";
import ReactDOM from "react-dom";
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import addons from 'react-addons';
import $ from 'jquery';
console.log("hello world!！");
var Gist =  React.createClass({
	render: function() {
		return (
			<p>{this.props.item.name}</p>
		);
	}
});
var UserGist = React.createClass({
  getInitialState: function() {
    return {
      data: []
    };
  },

  componentDidMount: function() {
  	this.setState({
  		data: [{"name":'tx'},{"name":'wq'}]
  	});
  },
  click: function(){
	this.setState({
		data: []
   	});
  },
  render: function() {
  	var arr = [];
	$.each(this.state.data, function(i,item){
		arr.push(<Gist key={i} item={item}/>);
	});
	return (
      <div>
        {arr}
        <button onClick={this.click}>点击</button>
      </div>
    );
  }
});

ReactDOM.render(
  <UserGist source="https://api.github.com/users/octocat/gists" />,
  document.getElementById('example')
);

// var Comment = React.createClass({
//   render: function() {
//     return (
//       <div className="comment">
//         <h2 className="commentAuthor">
//           {this.props.author}
//         </h2>
//         {this.props.children}
//       </div>
//     );
//   }
// });
// var CommentList = React.createClass({
//   render: function() {
//     return (
//       <div className="commentList">
//         <Comment author="Pete Hunt">This is one comment</Comment>
//         <Comment author="Jordan Walke">This is *another* comment</Comment>
//       </div>
//     );
//   }
// });

// var CommentForm = React.createClass({
//   render: function() {
//     return (
//       <div className="commentForm">
//         Hello, world! I am a CommentForm.
//       </div>
//     );
//   }
// });
// var CommentBox = React.createClass({
//   render: function() {
//     return (
//       <div className="commentBox">
//         <h1>Comments</h1>
//         <CommentList author="tx"/>
//         <CommentForm />
//       </div>
//     );
//   }
// });

// ReactDOM.render(
//   <CommentBox />,
//   document.getElementById('example')
// );



// var FancyCheckbox = React.createClass({
//   render: function() {
//     var fancyClass = this.props.checked ? 'FancyChecked' : 'FancyUnchecked';
//     // 反模式：`checked` 会被传到里面的组件里
//     return (
//       <div {...this.props} className={fancyClass} />
//     );
//   }
// });
// ReactDOM.render(
//   <FancyCheckbox checked={true} onClick={console.log.bind(console)}>
//     Hello world!
//   </FancyCheckbox>,
//   document.getElementById('example')
// );


// var SetIntervalMixin = {
//   componentWillMount: function() {
//     this.intervals = [];
//   },
//   setInterval: function() {
//     this.intervals.push(setInterval.apply(null, arguments));
//   },
//   componentWillUnmount: function() {
//     this.intervals.map(clearInterval);
//   }
// };

// var TickTock = React.createClass({
//   mixins: [SetIntervalMixin], // 引用 mixin
//   getInitialState: function() {
//     return {seconds: 0};
//   },
//   componentDidMount: function() {
//     this.setInterval(this.tick, 1000); // 调用 mixin 的方法
//   },
//   tick: function() {
//     this.setState({seconds: this.state.seconds + 1});
//   },
//   render: function() {
//     return (
//       <p>
//       React has been running for <span style={{color: 'red'}}>{this.state.seconds} </span>seconds.
//       </p>
//     );
//   }
// });

// ReactDOM.render(
//   <TickTock />,
//   document.getElementById('example')
// );



// var ProductCategoryRow = React.createClass({
//   render: function() {
//     return (<tr><th colSpan="2">{this.props.category}</th></tr>);
//   }
// });

// var ProductRow = React.createClass({
//   render: function() {
//     var name = this.props.product.stocked ?
//       this.props.product.name :
//       <span style={{color: 'red'}}>
//         {this.props.product.name}
//       </span>;
//     return (
//       <tr>
//         <td>{name}</td>
//         <td>{this.props.product.price}</td>
//       </tr>
//     );
//   }
// });

// var ProductTable = React.createClass({
//   render: function() {
//     var rows = [];
//     var lastCategory = null;
//     this.props.products.forEach(function(product) {
//       if (product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)) {
//         return;
//       }
//       if (product.category !== lastCategory) {
//         rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
//       }
//       rows.push(<ProductRow product={product} key={product.name} />);
//       lastCategory = product.category;
//     }.bind(this));
//     return (
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Price</th>
//           </tr>
//         </thead>
//         <tbody>{rows}</tbody>
//       </table>
//     );
//   }
// });

// var SearchBar = React.createClass({
//   handleChange: function() {
//     this.props.onUserInput(
//       this.refs.filterTextInput.value,
//       this.refs.inStockOnlyInput.checked
//     );
//   },
//   render: function() {
//     return (
//       <form>
//         <input type="text" placeholder="Search..." value={this.props.filterText} ref="filterTextInput" onChange={this.handleChange} />
//         <p>
//           <input type="checkbox" checked={this.props.inStockOnly} ref="inStockOnlyInput" onChange={this.handleChange} />
//           {' '}
//           Only show products in stock
//         </p>
//       </form>
//     );
//   }
// });

// var FilterableProductTable = React.createClass({
//   getInitialState: function() {
//     return {
//       filterText: '',
//       inStockOnly: false
//     };
//   },

//   handleUserInput: function(filterText, inStockOnly) {
//     this.setState({
//       filterText: filterText,
//       inStockOnly: inStockOnly
//     });
//   },

//   render: function() {
//     return (
//       <div>
//         <SearchBar filterText={this.state.filterText} inStockOnly={this.state.inStockOnly} onUserInput={this.handleUserInput} />
//         <ProductTable products={this.props.products} filterText={this.state.filterText} inStockOnly={this.state.inStockOnly} />
//       </div>
//     );
//   }
// });


// var PRODUCTS = [
//   {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
//   {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
//   {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
//   {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
//   {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
//   {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
// ];

// ReactDOM.render(
//   <FilterableProductTable products={PRODUCTS} />,
//   document.getElementById('example')
// );


// var WithLink = React.createClass({
//   mixins: [addons.LinkedStateMixin],
//   getInitialState: function() {
//     return {message: 'Hello!',name: 'Hello!'};
//   },
//   handleChange: function(e){
//    	this.valueLink.requestChange(e.target.value);
//    	console.log(this.valueLink.value)
//    	this.setState({name: this.valueLink.value});
//   },
//   render: function() {
//     this.valueLink = this.linkState('message');
//     return (<input type="text" value={this.valueLink.value} onChange={this.handleChange} name={this.valueLink.value}/>);
//   }
// });

// ReactDOM.render(
//   <WithLink />,
//   document.getElementById('example')
// );
