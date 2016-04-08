import React, { Component, PropTypes } from 'react';
import { generateTreeStructure } from 'app/utils';
import LoadingIndicator from 'app/components/LoadingIndicator';
import CommentTree from './CommentTree';

export default class CommentView extends Component {
  static propTypes = {
    comments: PropTypes.array
  };

  render() {
    const { comments } = this.props;
    const tree = generateTreeStructure(comments);
    return (
      <div>
        <h4>Comments</h4>
        <LoadingIndicator loading={!comments}>
          {comments && <CommentTree comments={tree} />}
        </LoadingIndicator>
      </div>
    );
  }
}