import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';

class CreateProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displaySocialInputs: false,
            handle: '',
            company: '',
            website: '',
            location: '',
            status: '',
            skills: '',
            githubusername: '',
            bio: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            youtube: '',
            instagram: '',
            errors: {}
        }
    }

    render() {
        return (
            <div className = "create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 text-center">
                            <h1 className="display-4 text-center">Create your profile</h1>
                            <p>Please fill the form in order to connect other developers</p>
                            <small className="d-block pb3"> * Required fields</small>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

CreateProfile.proptypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
})
export default connect(mapStateToProps)(CreateProfile)