import React from 'react';
import ReactDom from 'react-dom';
import Records from './Records';
import AddComment from './AddComment';
import getCurrentDate from './getCurrentDate';
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
      // document.querySelector('.form__addcom').reset();
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
        return false;
      } else {
        return true;
      }
    });
    this.saveToStorage(newComments);
    this.setState({ comments: newComments });
  }

  render() {
    return (
      <div className="comment-app">
        <AddComment
          onChangeValue={this.onChangeHandler}
          submitHandler={this.onSubmitHandler}
          commentBody={this.state.commentBody}
          commentAuthor={this.state.commentAuthor}
        />
        <Records
          comments={this.state.comments}
          deleteComment={this.btnDeleteClickHandler}
        />
      </div>
    );
  }
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
