import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
    user: state.user,
    state_and_SLO: state.state_and_SLO,
    state_lead: state.state_lead 
});

class AddTrainer extends Component {

    constructor(props) {
        super(props)

        this.state = {
            newTrainer: {
                first_name: '',
                last_name: '',
                title: '',
                email: '',
                phone_number: '',
                organization: '',
                state: '',
                state_level_organization: '',
                state_lead: '',
                cohort: ''
            }
        }
    }

    

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({ type: 'FETCH_STATE_LEVEL_ORG' });
        this.props.dispatch({ type: 'FETCH_STATE_LEAD' });
        // this.props.dispatch({ type: 'FETCH_COHORTS' });
    }

    componentDidUpdate() {
        // if (!this.props.user.isLoading && this.props.user.userName === null) {
        //     this.props.history.push('home');
        // }
    }

    handleChangeFor = (propertyName) => {
        return (event) => {
            this.setState({
                newTrainer: {
                    ...this.state.newTrainer,
                    [propertyName]: event.target.value
                }
            })
        }
    }

    // addLog = () => {
    //     this.props.dispatch({
    //         type: 'POST_LOG',
    //         payload: this.state.newLog
    //     })
    //     this.props.history.push('patientGraph');
    // }

    addNewTrainer = event => {
        event.preventDefault();
        this.props.dispatch({ type: 'ADD_LT', payload: this.state.newTrainer })
        this.setState({
            newTrainer: {
                first_name: '',
                last_name: '',
                title: '',
                email: '',
                phone_number: '',
                organization: '',
                state: '',
                state_level_organization: '',
                state_lead: '',
                cohort: ''
            }
        });
    }

    render() {
        let stateListArray = this.props.state_and_SLO.map((item, index) => {
            return <option value={item.state}>{item.state}</option> 
        })
        let SLOListArray = this.props.state_and_SLO.map((item, index) => {
            return <option value={item.name}>{item.name}</option> 
        })
        let stateLeadListArray = this.props.state_lead.map((item, index) => {
            return <option value={item.first_name}>{item.first_name} {item.last_name}</option> 
        })
        // let content = null;
        // if (this.props.user.userName) {
           let content = (
                <div>
                    {/* <Nav /> */}
                    <h2>Add New Trainer</h2>
                    <form onSubmit={this.addNewTrainer}>
                        <input type='text' placeholder='First Name' value={this.state.newTrainer.first_name} onChange={this.handleChangeFor('first_name')} />
                        <input type='text' placeholder='Last Name' value={this.state.newTrainer.last_name} onChange={this.handleChangeFor('last_name')} />
                        <input type='text' placeholder='Title' value={this.state.newTrainer.title} onChange={this.handleChangeFor('title')} />
                        <input type='text' placeholder='Email' value={this.state.newTrainer.email} onChange={this.handleChangeFor('email')} />
                        <input type='text' placeholder='Phone Number' value={this.state.newTrainer.phone_number} onChange={this.handleChangeFor('phone_number')} />
                        <input type='text' placeholder='Organization' value={this.state.newTrainer.organization} onChange={this.handleChangeFor('organization')} />
                        <select name="state">
                            <option value="">State</option>
                            {stateListArray}
                        </select>
                        <select name="state_level_organization">
                            <option value="">State Level Organization</option>
                            {SLOListArray}
                        </select>
                        <select name="state_lead">
                            <option value="">State Lead</option>
                            {stateLeadListArray}
                        </select>
                        <select name="cohort">
                            <option value="">Cohort</option>
                        </select>
                        <input type='submit' value='Submit' />
                    </form>
                    <h2>Recently Added</h2>
                </div>
            );
        // } 

        return (
            <div>
                {content}
            </div>
        );
    }
}

export default connect(mapStateToProps)(AddTrainer);