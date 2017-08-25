import React from 'react';
import store, { postFic, changeFicForm } from '../store';

export default class AddFic extends React.Component {

  constructor() {
    super();
    this.state = store.getState();
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleWordcountChange = this.handleWordcountChange.bind(this)
    this.handleStatusChange = this.handleStatusChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    })
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleTitleChange(event) {
    let currentFicBeingAdded = this.state.currentFicBeingAdded;
    currentFicBeingAdded.title = event.target.value;
    const action = changeFicForm(currentFicBeingAdded);
    store.dispatch(action);
  }
  handleWordcountChange(event) {
    let currentFicBeingAdded = this.state.currentFicBeingAdded;
    currentFicBeingAdded.startingWordcount = Number(event.target.value);
    const action = changeFicForm(currentFicBeingAdded);
    store.dispatch(action);
  }

  handleStatusChange(event) {
    let currentFicBeingAdded = this.state.currentFicBeingAdded;
    currentFicBeingAdded.status = event.target.value;
    const action = changeFicForm(currentFicBeingAdded);
    store.dispatch(action);
  }

  handleSubmit(event) {
    event.preventDefault();
    const thunk = postFic(this.formValues);
    this.formValues = {};
    store.dispatch(thunk);
  }

  render() {

    return (

      <div className="fic-form-container">
        <form onSubmit={this.handleSubmit}>
          <label>Title</label>
          <input type="text" value={this.state.currentFicBeingAdded.title} onChange={this.handleTitleChange} />

          <label>Starting Wordcount</label>
          <input type="number" value={this.state.currentFicBeingAdded.startingWordcount} onChange={this.handleWordcountChange} />

          <label>Status</label>
          <select onChange={this.handleStatusChange} value={this.state.currentFicBeingAdded.status}>
            <option value="in-progress">in-progress</option>
            <option value="complete">complete</option>
            <option value="needs-edits">needs-edits</option>
            <option value="abandoned">abandoned</option>
          </select>
          <button type="submit">
            Add
          </button>
        </form>
      </div>

    )
  }
}
