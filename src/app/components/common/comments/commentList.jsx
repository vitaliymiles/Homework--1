import React from 'react'
import PropTypes from 'prop-types'
import Comment from './comment'

const CommentList = ({ comments, onRemove }) => {
    return comments.map((comment) => (
        <Comment key={comment._id} {...comment} onRemove={onRemove} />
    ))
}
CommentList.propTypes = {
    comments: PropTypes.array,
    onRemove: PropTypes.func
}
export default CommentList
