import React from 'react'
import ReactDOM from 'react-dom'
import Autosuggest from 'react-autosuggest'
import axios from 'axios'
import { debounce } from 'throttle-debounce'

import './styles.css'

class AutoComplete extends React.Component {
  state = {
    value: '',
    suggestions: []
  }

  componentWillMount() {
    this.onSuggestionsFetchRequested = debounce(
      500,
      this.onSuggestionsFetchRequested
    )
  }

  renderSuggestion = suggestion => {
    return (
      <div className="result">
        <div>{suggestion}</div>
      </div>
    )
  }

  onChange = (event, { newValue }) => {
    this.setState({ value: newValue })
  }

  onSuggestionsFetchRequested = ({ value }) => {
    axios
      .post('https://' + [ENTER YOUR AZURE SEARCH API KEY]  +'/indexes/' + [ENTER YOUR AZURE SEARCH INDEX NAME] + '/docs/autocomplete?api-version=2017-11-11-Preview', 
        {
		  "search": value,
		  "suggesterName": "sg",
		  "autocompleteMode": "twoTerms"
        },
        {
          headers: 
		  { 
			'Content-Type': 'application/json', 
			'api-key': [ENTER YOUR AZURE SEARCH API KEY]
		  }
        }
      )
      .then(res => {
        const results = res.data.value.map(h => h.text)
        this.setState({ suggestions: results })
      })
  }

  onSuggestionsClearRequested = () => {
    this.setState({ suggestions: [] })
  }

  render() {
    const { value, suggestions } = this.state

    const inputProps = {
      placeholder: 'customer name or short code',
      value,
      onChange: this.onChange
    }

    return (
      <div className="App">
        <h1>AutoComplete Demo</h1>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={suggestion => suggestion}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
        />
      </div>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<AutoComplete />, rootElement)
