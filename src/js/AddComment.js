import React from "react";
import getCurrentDate from "./getCurrentDate";

class AddComment extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.clickSubmitHandler = this.clickSubmitHandler.bind(this);
    this.form = React.createRef();
  }

  handleChange(event) {
    this.props.onChangeValue(event);
  }

  clickSubmitHandler(event) {
    event.preventDefault();
    this.props.submitHandler(event);
    if (this.props.commentAuthor !== "" && this.props.commentBody !== "") {
      this.form.current.reset();
    }
  }

  render() {
    return (
      <div className="comment__add">
        <h2 className="comment__head">Добавить комментарий</h2>
        <form name="add-comment" className="form__addcom" ref={this.form}>
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

export default AddComment
