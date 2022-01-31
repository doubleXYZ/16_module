import React from "react";

function Records(props) {
  const records = props.comments;

  const recordsList = records.map((record) => {
    return (
      <li key={record.id}>
        <article data-id={record.id} className="comment__full">
          <UserInfo comment_auth={record.commentAuthor} />
          <CommentDate commentDate={record.commentDate} />
          <CommentText commentBody={record.commentBody} />
          <button className="comment__btn-del" onClick={props.deleteComment}>
            Delete comment
          </button>
        </article>
      </li>
    );
  });

  return <ol className="comment__list"> {recordsList} </ol>;
}


function UserInfo(props) {
  return <div className="comment__author"> {props.comment_auth} </div>;
}

function CommentDate(props) {
  return <div className="comment__date">{props.commentDate}</div>;
}

function CommentText(props) {
  return <div className="comment__body">{props.commentBody}</div>;
}

export default Records
