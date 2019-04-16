import * as React from 'react';
import { get } from 'lodash';
import cx from 'classnames';
import SearchPage from 'app/components/Search/SearchPage';
import { SearchResult } from 'app/reducers/search';
import styles from './Validator.css';
import goodSound from 'app/assets/good-sound.mp3';

interface State {
  showCompleted: boolean
};

interface Props {
  clearSearch: () => void,
  handleSelect: SearchResult => Promise<void>,
  location: Object,
  onQueryChanged: string => void,
  results: Array<SearchResult>,
  searching: boolean
};

class Validator extends React.Component<Props, State> {
  input: ?HTMLInputElement;
  state = {
    showCompleted: false
  };

  showCompleted = () => {
    this.setState({ showCompleted: true });
    setTimeout(() => this.setState({ showCompleted: false }), 2000);
  };

  handleSelect = (result: SearchResult) => {
    this.props.clearSearch();
    return this.props
      .handleSelect(result)
      .then(
        () => {
          const sound = new window.Audio(goodSound);
          sound.play();
          this.showCompleted();
        },
        err => {
          const payload = get(err, 'payload.response.jsonData');
          if (payload && payload.errorCode === 'not_registered') {
            alert('Bruker er ikke påmeldt på eventet!');
          } else if (payload && payload.errorCode === 'already_present') {
            alert(payload.error);
          } else {
            alert(
              `Det oppsto en uventet feil: ${JSON.stringify(payload || err)}`
            );
          }
        }
      )
      .then(() => {
        if (this.input) {
          this.input.focus();
        }
      });
  };

  render() {
    return (
      <div>
        <div
          className={cx(styles.overlay, {
            [styles.shown]: this.state.showCompleted
          })}
        >
          <h3>
            Tusen takk! Kos deg{' '}
            <span role="img" aria-label="smile">
              😀
            </span>
          </h3>
          <i className="fa fa-check" />
        </div>
        <SearchPage
          {...this.props}
          placeholder="Skriv inn brukernavn eller navn"
          handleSelect={this.handleSelect}
          inputRef={input => {
            this.input = input;
          }}
        />
      </div>
    );
  }
}

export default Validator;
