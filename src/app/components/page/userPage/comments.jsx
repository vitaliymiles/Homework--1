import React, { useEffect, useState } from 'react'
import { orderBy } from 'lodash'
import API from '../../../api'
import { useParams } from 'react-router-dom'
import CommentList from '../../common/comments/commentList'
import AddCommentForm from '../../common/comments/addCommentForm'

const Comments = () => {
    const { userId } = useParams()
    const [comments, setComments] = useState([])

    useEffect(() => {
        API.comments.fetchCommentsForUser(userId).then((data) => {
            setComments(data)
        })
    }, []) // запрашиваем комментарии в API через fetchCommentsForUser

    const handleSubmit = (data) => {
        API.comments
            .add({ ...data, pageId: userId })
            .then((data) => setComments([...comments, data]))
    }

    const hendleRemoveComment = (id) => {
        API.comments.remove(id).then((id) => {
            setComments(comments.filter((n) => n._id !== id))
        })
    }

    const sortedComments = orderBy(comments, ['created_at'], ['desc']) // сортировка комментариев
    return (
        <>
            <div className="card mb-2">
                {' '}
                <div className="card-body ">
                    <AddCommentForm onSubmit={handleSubmit} />
                </div>
            </div>
            {sortedComments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body ">
                        <h2>Comments</h2>
                        <hr />
                        <CommentList
                            comments={sortedComments}
                            onRemove={hendleRemoveComment}
                        />
                    </div>
                </div>
            )}
        </>
    )
}

export default Comments
