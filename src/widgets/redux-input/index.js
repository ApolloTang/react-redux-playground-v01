import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import classnames from 'classnames';

class ReduxInput extends React.Component {
  constructor(props) {
    super(props)

    this.onInputChange = this.onInputChange.bind(this);
    this.onInputBlur = this.onInputBlur.bind(this);

    this.state = {
      cachedValue: this.props.value,
      displayedString: this.props.formatIn(this.props.value),
      lastOut: this.props.value
    };
  }
  static defaultProps = {
    onChange: () => {},
    shouldAllowInput: () => true,
    autocorrect: value => value,
    formatIn: value => value,
    disabled: false,
    formatOut: string => string,
    id: null,
    className: '',
    type: 'text',
  }
  componentWillMount () {
      this.emitChange = _.debounce(value => {
          const cachedValue = this.props.formatOut(this.state.displayedString);
          // set lastOut directly, re-render is not necessary
          this.state.lastOut = cachedValue;
          this.props.onChange(cachedValue);
      }, 150);
  }
  componentWillReceiveProps (nextProps) {
      if (
          (nextProps.value !== this.props.value) &&
          (nextProps.value !== this.state.lastOut)
      ) {
          this.setState({
              cachedValue: nextProps.value,
              displayedString: nextProps.formatIn(nextProps.value),
              lastOut: nextProps.value
          });
      }
  }
  shouldComponentUpdate (nextProps, nextState) {
      // Only ever update if what is displayed needs to be updated
      return (
          (nextState.displayedString !== this.state.displayedString) ||
          (nextProps.disabled !== this.props.disabled)
      );
  }
  onInputChange (event) {
      const domString = event.target.value;
      const nextValue = this.props.formatOut(domString);

      if (this.props.shouldAllowInput(domString)) {
          this.setState({
              cachedValue: nextValue,
              displayedString: domString,
          });
          this.emitChange(nextValue);
      }
  }
  onInputBlur () {
    // On blur
    // 1) autocorrect internal value
    // If applicable:
    // 2) flush out all internal changes immediately to prepare for form submission
    // 3) format displayed text
      const correctedValue = this.props.autocorrect(this.state.cachedValue);
      // const correctedValue = this.props.autocorrect(event.target.value); // this fixed something?
      const correctedDisplayString = this.props.formatIn(correctedValue);

      if (correctedDisplayString !== this.state.displayedString) {
          if (this.isMounted()) {
              this.setState({
                  displayedString: correctedDisplayString
              });
          }
      }
      if (correctedValue !== this.state.cachedValue) {
          this.setState({
              cachedValue: correctedValue,
          }, () => this.props.onChange(correctedValue));
      }
  }
  render() {
      return (
          <input
              className={classnames(
                  'ef3-stdInput',
                  this.props.className,
              )}
              disabled={this.props.disabled}
              placeholder={this.props.placeholder}
              type={this.props.type}
              value={this.state.displayedString}
              onChange={this.onInputChange}
              onBlur={this.onInputBlur}
              id={this.props.id}
          />
      );
  }
};
ReduxInput.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
  formatIn: PropTypes.func,
  formatOut: PropTypes.func,
  autocorrect: PropTypes.func,
  placeholder: PropTypes.string,
  shouldAllowInput: PropTypes.func,
  id: PropTypes.string,
  type: PropTypes.oneOf(['text', 'search', null]),
  className: PropTypes.string,
};
export default ReduxInput;



export function formatNumber (value) {
    if (!value) {
        return value;
    }

    return numeral(value).format('0,0');
}


export function unformatNumber (value) {
    if (!value) {
        return value;
    }

    return numeral().unformat(value);
}
