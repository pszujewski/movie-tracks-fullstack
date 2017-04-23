import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {connect} from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import './search.css';

// {</*input placeholder='Enter a movie title here' className='search' type='text' />*/}
// {/*<button className='btn'>Search</button>*/}

export function Search(props) {
  console.log(props.titles);
  if (typeof props.titles !== 'undefined') {
    return (
      <div className='row search-wrapper'>
        <div className='eight columns offset-by-two'>
          <h5>Find and listen to music from your favorite movies.</h5>
          <form>
            <MuiThemeProvider>
              <AutoComplete 
                hintText='Enter a movie title here'
                fullWidth={false} 
                dataSource={props.titles}
                underlineShow={false} 
              />
            </MuiThemeProvider>
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

const mapStateToProps = (state) => ({
  titles: state.autoComplete.titles
});

export default connect(mapStateToProps)(Search);