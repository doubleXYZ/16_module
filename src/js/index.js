import React from 'react';
import ReactDom from 'react-dom';
import '../css/comments.css';



class CommentApp extends React.Component {
  constructor(props) {
    super(props);
    // Инициализация состояния
    // Загрузка существующих сообщений
    let savedComments = this.getSavedComments();
    let isCommentsExist = savedComments.length;

    if (!isCommentsExist) {
      savedComments = []
    }

    localStorage.setItem('comments-app', JSON.stringify(savedComments));
    this.state = {
      comments: savedComments,
      commentAuthor: '',
      commentDate: '',
      commentBody: '',
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.btnDeleteClickHandler = this.btnDeleteClickHandler.bind(this);
    this.saveToStorage = this.saveToStorage.bind(this);

  }

  getSavedComments() {
    const savedComm = localStorage.getItem('comments-app');
    if (savedComm) {
      return JSON.parse(savedComm)
    } else {
      return [];
    }
  }

  saveToStorage(newComments) {
    const commentsToSave = JSON.stringify(newComments);
    localStorage.setItem('comments-app', commentsToSave);
  }

  onChangeHandler(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  onSubmitHandler(event) {
    const commentAuthor = this.state['commentAuthor'];
    const commentBody = this.state['commentBody'];
    const commentDate = getCurrentDate();
    const id = getId();
    const comments = this.state.comments;

    if (commentAuthor !== '' && commentBody !== '') {
      comments.push({
        id,
        commentAuthor,
        commentDate,
        commentBody,
      });
      this.setState({
        comments,
        commentAuthor: '',
        commentDate: '',
        commentBody: '',
      });
      this.saveToStorage(comments);
      document.querySelector('.form__addcom').reset();
    }
  }

  btnDeleteClickHandler(event) {
    const allComments = this.state.comments;
    const target = event.target.parentElement;
    const id = target.dataset.id;
    // найти нужный объект в allComments по исходному id и удалить его
    const newComments = allComments.filter((item) => {
      const commentId = item['id'].toString();
      if (id === commentId) {
        console.log(typeof commentId, typeof id);
        return false;
      } else {
        console.log(typeof commentId, typeof id);
        return true;
      }
    });
    this.saveToStorage(newComments);
    this.setState({ comments: newComments });
  }

  render() {
    return (
      <div className="comment-app">
        <AddComment onChangeValue={this.onChangeHandler} submitHandler={this.onSubmitHandler} />
        <Records comments={this.state.comments} deleteComment={this.btnDeleteClickHandler} />
      </div>
    );
  }
}

class AddComment extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.clickSubmitHandler = this.clickSubmitHandler.bind(this);
  }

  handleChange(event) {
    this.props.onChangeValue(event);
  }

  clickSubmitHandler(event) {
    event.preventDefault();
    this.props.submitHandler(event);
  }

  render() {
    return (
      <div className="comment__add">
        <h2 className="comment__head">Добавить комментарий</h2>
        <form name="add-comment" className="form__addcom">
          <label htmlFor="author_com">Автор комментария</label>
          <input
            id="author_com"
            name="commentAuthor"
            type="text"
            value={this.props.commentAuthor}
            onChange={this.handleChange}
            className="form__author"
          />

          <textarea
            name="commentBody"
            value={this.props.commentBody}
            onChange={this.handleChange}
            rows="5"
            className="form__text"
          />
          <div className="form__date">{getCurrentDate()}</div>
          <input
            type="submit"
            value="Add comment"
            onClick={this.clickSubmitHandler}
            className="form__btn"
          />
        </form>
      </div>
    );
  }
}

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

function getCurrentDate() {
  const date = new Date();

  const year = date.getFullYear();
  const monthNum = date.getMonth();
  const month = monthNum > 9 ? monthNum + 1 : monthNum === 9 ? monthNum + 1 : '0' + monthNum;
  const dayNum = date.getDate();
  const day = dayNum > 9 ? dayNum : '0' + dayNum;
  const hoursNum = date.getHours();
  const hours = hoursNum > 9 ? hoursNum : '0' + hoursNum;
  const minutesNum = date.getMinutes();
  const minutes = minutesNum > 9 ? minutesNum : '0' + minutesNum;
  const curDate = `${year}-${month}-${day} ${hours}:${minutes}`;

  return curDate;
}

function getId() {
  let id = '';
  for (let i = 0; i < 16; i++) {
    const chunk = Math.floor(Math.random() * 16).toString(16);
    id += chunk;
  }
  return id;
}

// ---------------------------- //

ReactDom.render(<CommentApp />, document.querySelector('#root'));
