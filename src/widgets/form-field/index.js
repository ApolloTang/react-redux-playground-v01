import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';


class FormField extends React.Component {
  render() {
    const {
      label,
      isRequired,
      showErrors,
      description,
      tooltip,
    } = this.props;

    const requiredAsterix = this.props.isRequired ? '*' : '';

    const errors = showErrors ? [].concat(this.props.errors) : [];

    return (
      <div className={classnames('ef3-formField', this.props.className)}>
        {
          label ?
          <span className="ef3-formField_label">
            {label}
            <span className="ef3-formField_label_asterix">{requiredAsterix}</span>
          </span>:
          null
        }
        <div className="ef3-formField_child">
          {this.props.children}
          {(!!description || !!errors.length) &&
            <div className={classnames(
              'ef3-formField_description',
              { 'is-error': this.props.showErrors }
            )}>
            <div className="ef3-formField_description_description">{description}</div>
              {errors.map((error, i) => (
                <div key={i}>{error}</div>
              ))}
            </div>
          }
        </div>
      </div>
    );
  }
};
FormField.propTypes = {
  label: PropTypes.string,
  description: PropTypes.string,
  tooltip: PropTypes.object,
  errors: PropTypes.array,
  showErrors: PropTypes.bool,
  isRequired:PropTypes.bool,
  className: PropTypes.string
};

export default FormField;
