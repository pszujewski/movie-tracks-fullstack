import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {connect} from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import './search.css';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import {fetchMovie} from '../../actions';

// {</*input placeholder='Enter a movie title here' className='search' type='text' />*/}
// {/*<button className='btn'>Search</button>*/}

export class Search extends React.Component {

  constructor(props) {
    super(props);
    this.searchTerm = '';
  }

  handleUpdateInput = inputVal => {
    this.searchTerm = inputVal;
  };

  handleSubmit(event) {
    event.preventDefault();
    this.props.dispatch(fetchMovie(this.searchTerm));
  }

  render() {
    if (typeof this.props.titles !== 'undefined') {
      return (
        <div className='row search-wrapper'>
          <div className='eight columns offset-by-two'>
            <h5>Find and listen to music from your favorite movies.</h5>
            <form onSubmit={e => this.handleSubmit(e)}>
              <div className='autocomplete-container'>
                <MuiThemeProvider>
                  <AutoComplete
                    hintText='Enter a movie title here'
                    fullWidth={true} 
                    dataSource={this.props.titles}
                    maxSearchResults={8}
                    menuCloseDelay={100}
                    underlineShow={true}
                    onUpdateInput={inputVal => this.handleUpdateInput(inputVal)}
                  />
                </MuiThemeProvider>
              </div>
              <button className='btn'>Search</button>
            </form>
          </div>
        </div>
      );
    } 
    else {
      return (
        <div>
          <MuiThemeProvider>
            <CircularProgress />
          </MuiThemeProvider>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  titles: state.autoComplete.titles
});

export default connect(mapStateToProps)(Search);