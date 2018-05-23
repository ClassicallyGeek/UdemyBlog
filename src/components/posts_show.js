import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchPost, deletePost } from '../actions';

class PostsShow extends Component {
  componentDidMount() {
    // if (!this.props.post) we could check for the post so we don't re-fetch it.
    const { id } = this.props.match.params; // provided by react-router
    this.props.fetchPost(id);
  }

  onDeleteClick() {
    // if we matched on the this.props.post.id -- we might not have that data yet. We know it's in the url.
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => {
      this.props.history.push('/'); // Return them to the home page.
    });
  }

  render() {
    const { post } = this.props;

    if (!post) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <Link to="/">Back To Index</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}>
          Delete Post
        </button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}

// @param state
// @param ownProps - this components props
function mapStateToProps({posts}, ownProps) {
  return { post : posts[ownProps.match.params.id] };
}
export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
