import React from 'react';

import Fic from './Fic'
import NavBar from './NavBar'
import AddFic from './AddFic'
import store, { loadAllFics } from '../store';

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = store.getState();
  }

  render() {
    return (
      <div>
        <NavBar canEdit />

        <AddFic />

        {
          this.state.fics.map(fic => {
            return (
              <Fic key={fic.id} fic={fic} />
            )
          })
        }

        <footer>Made by Tess</footer>
      </div>
    )
  }

  componentDidMount() {
    store.dispatch(loadAllFics());
    this.unsubscribe = store.subscribe( () => {
      this.setState(store.getState());
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

}
