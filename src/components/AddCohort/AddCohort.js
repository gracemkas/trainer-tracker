import React, { Component } from 'react';
import { connect } from 'react-redux';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { COHORT_ACTIONS } from '../../redux/actions/cohortActions';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { Save } from '@material-ui/icons';


const moment = require('moment');

const mapStateToProps = state => ({
    user: state.user,
    localTrainerReducer: state.localTrainerReducer,
    cohortReducer: state.cohortReducer,
    stateLeadReducer: state.stateLeadReducer
});

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
});
class AddCohort extends Component {

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
                district: '',
                cohort: 0
            },
            recentlyAdded: []
        }
    }

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        // this.props.dispatch({ type: COHORT_ACTIONS.FETCH_STATES });
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('home');
        }
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

    handleChangeForState = (propertyName) => {
        return (event) => {
            this.setState({
                newTrainer: {
                    ...this.state.newTrainer,
                    [propertyName]: event.target.value
                }
            })
            this.props.dispatch({ type: COHORT_ACTIONS.FETCH_FILTER_STATE, payload: event.target.value });
        }
    }

    handleChangeForSLO = (propertyName) => {
        return (event) => {
            this.setState({
                newTrainer: {
                    ...this.state.newTrainer,
                    [propertyName]: event.target.value
                }
            })
            this.props.dispatch({ type: COHORT_ACTIONS.FETCH_FILTER_SLO, payload: event.target.value });
        }
    }

    // reset = () => {
    //     let stateDrop = document.getElementById("stateDrop");
    //     stateDrop.selectedIndex = 0;
    //     let SLODrop = document.getElementById("SLODrop");
    //     SLODrop.selectedIndex = 0;
    //     let cohortDrop = document.getElementById("cohortDrop");
    //     cohortDrop.selectedIndex = 0;
    // }

    // addNewTrainer = event => {
    //     event.preventDefault();
    //     this.props.dispatch({ type: 'ADD_LT', payload: this.state.newTrainer })
    //     this.state.recentlyAdded.unshift(this.state.newTrainer);
    //     this.setState({
    //         newTrainer: {
    //             first_name: '',
    //             last_name: '',
    //             title: '',
    //             email: '',
    //             phone_number: '',
    //             organization: '',
    //             district: ''
    //         }
    //     });
    //     this.reset();
    // }

    render() {
        let stateListArray = this.props.cohortReducer.state_dropDown.map((item, index) => {
            return <option value={item}>{item}</option>
        })
        let SLOListArray = this.props.cohortReducer.SLO_dropDown.map((item, index) => {
            return <option value={item.state_level_organization_id}>{item.name}</option>
        })
        let cohortListArray = this.props.cohortReducer.cohort_dropDown.map((item, index) => {
            return <option value={item.cohort_id}>{item.name}</option>
        })

        let content = null;
        if (this.props.user.userName) {
            const date = moment().format().split('T', 1);
            content = (
                <div>
                    <h2 className='centerHeadings'>Create New Cohort</h2>
                    <Grid container>
                        <Grid item xs={5}></Grid>
                        <Grid item xs={6}>
                            <form className='trainerForm' onSubmit={this.addNewTrainer}>
                                <Grid container>
                                    <Grid item xs={9}>
                                        <input className='lengthOfInputsCohort' type='text' placeholder='Name of Cohort' value={this.state.newTrainer.first_name} onChange={this.handleChangeFor('name_of_cohort')} />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Save />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <select id='stateDrop' className='lengthOfInputsCohort' onChange={this.handleChangeForState('state')}>
                                            <option value="state">State</option>
                                            {/* {stateListArray} */}
                                        </select>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <select id='SLODrop' className='lengthOfInputsCohort' onChange={this.handleChangeForSLO('state_level_organization')}>
                                            <option value="">State Level Organization</option>
                                            {/* {SLOListArray} */}
                                        </select>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <select id='cohortDrop' className='lengthOfInputsCohort' onChange={this.handleChangeFor('cohort')}>
                                            <option value="">State Lead</option>
                                            {/* {cohortListArray} */}
                                        </select>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <form className={this.props.classes.container} noValidate>
                                            <TextField
                                                id="date"
                                                label="Initial TTT Workshop"
                                                type="date"
                                                defaultValue={date}
                                                onChange={this.handleChangeFor("choosenDate")}
                                            />
                                        </form>
                                    </Grid>
                                </Grid>
                            </form>
                        </Grid>
                    </Grid>
                    <h2 className='centerHeadings'>Cohort Deadlines</h2>
                    <Grid container>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={2}><p>Due Date</p></Grid>
                        <Grid item xs={2}><p>Notification Email 1</p></Grid>
                        <Grid item xs={4}><p>Notification Email 2</p></Grid>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={3}><p>Train the Trainers</p></Grid>
                        <Grid item xs={2}>
                            <form className={this.props.classes.container} noValidate>
                                <TextField
                                    id="date"
                                    type="date"
                                    defaultValue={date}
                                    onChange={this.handleChangeFor("choosenDate")}
                                />
                            </form>
                        </Grid>
                        <Grid item xs={2}>
                            <form className={this.props.classes.container} noValidate>
                                <TextField
                                    id="date"
                                    type="date"
                                    defaultValue={date}
                                    onChange={this.handleChangeFor("choosenDate")}
                                />
                            </form>
                        </Grid>
                        <Grid item xs={4}>
                            <form className={this.props.classes.container} noValidate>
                                <TextField
                                    id="date"
                                    type="date"
                                    defaultValue={date}
                                    onChange={this.handleChangeFor("choosenDate")}
                                />
                            </form>
                        </Grid>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={3}><p>Signed TTT Terms Agreement</p></Grid>
                        <Grid item xs={2}>
                            <form className={this.props.classes.container} noValidate>
                                <TextField
                                    id="date"
                                    type="date"
                                    defaultValue={date}
                                    onChange={this.handleChangeFor("choosenDate")}
                                />
                            </form>
                        </Grid>
                        <Grid item xs={2}>
                            <form className={this.props.classes.container} noValidate>
                                <TextField
                                    id="date"
                                    type="date"
                                    defaultValue={date}
                                    onChange={this.handleChangeFor("choosenDate")}
                                />
                            </form>
                        </Grid>
                        <Grid item xs={4}>
                            <form className={this.props.classes.container} noValidate>
                                <TextField
                                    id="date"
                                    type="date"
                                    defaultValue={date}
                                    onChange={this.handleChangeFor("choosenDate")}
                                />
                            </form>
                        </Grid>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={3}><p>Observed Training</p></Grid>
                        <Grid item xs={2}>
                            <form className={this.props.classes.container} noValidate>
                                <TextField
                                    id="date"
                                    type="date"
                                    defaultValue={date}
                                    onChange={this.handleChangeFor("choosenDate")}
                                />
                            </form>
                        </Grid>
                        <Grid item xs={2}>
                            <form className={this.props.classes.container} noValidate>
                                <TextField
                                    id="date"
                                    type="date"
                                    defaultValue={date}
                                    onChange={this.handleChangeFor("choosenDate")}
                                />
                            </form>
                        </Grid>
                        <Grid item xs={4}>
                            <form className={this.props.classes.container} noValidate>
                                <TextField
                                    id="date"
                                    type="date"
                                    defaultValue={date}
                                    onChange={this.handleChangeFor("choosenDate")}
                                />
                            </form>
                        </Grid>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={3}><p>Certification Workshop</p></Grid>
                        <Grid item xs={2}>
                            <form className={this.props.classes.container} noValidate>
                                <TextField
                                    id="date"
                                    type="date"
                                    defaultValue={date}
                                    onChange={this.handleChangeFor("choosenDate")}
                                />
                            </form>
                        </Grid>
                        <Grid item xs={2}>
                            <form className={this.props.classes.container} noValidate>
                                <TextField
                                    id="date"
                                    type="date"
                                    defaultValue={date}
                                    onChange={this.handleChangeFor("choosenDate")}
                                />
                            </form>
                        </Grid>
                        <Grid item xs={4}>
                            <form className={this.props.classes.container} noValidate>
                                <TextField
                                    id="date"
                                    type="date"
                                    defaultValue={date}
                                    onChange={this.handleChangeFor("choosenDate")}
                                />
                            </form>
                        </Grid>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={3}><p>C & C Training</p></Grid>
                        <Grid item xs={2}>
                            <form className={this.props.classes.container} noValidate>
                                <TextField
                                    id="date"
                                    type="date"
                                    defaultValue={date}
                                    onChange={this.handleChangeFor("choosenDate")}
                                />
                            </form>
                        </Grid>
                        <Grid item xs={2}>
                            <form className={this.props.classes.container} noValidate>
                                <TextField
                                    id="date"
                                    type="date"
                                    defaultValue={date}
                                    onChange={this.handleChangeFor("choosenDate")}
                                />
                            </form>
                        </Grid>
                        <Grid item xs={4}>
                            <form className={this.props.classes.container} noValidate>
                                <TextField
                                    id="date"
                                    type="date"
                                    defaultValue={date}
                                    onChange={this.handleChangeFor("choosenDate")}
                                />
                            </form>
                        </Grid>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={3}><p>Recertification</p></Grid>
                        <Grid item xs={2}>
                            <form className={this.props.classes.container} noValidate>
                                <TextField
                                    id="date"
                                    type="date"
                                    defaultValue={date}
                                    onChange={this.handleChangeFor("choosenDate")}
                                />
                            </form>
                        </Grid>
                        <Grid item xs={2}>
                            <form className={this.props.classes.container} noValidate>
                                <TextField
                                    id="date"
                                    type="date"
                                    defaultValue={date}
                                    onChange={this.handleChangeFor("choosenDate")}
                                />
                            </form>
                        </Grid>
                        <Grid item xs={4}>
                            <form className={this.props.classes.container} noValidate>
                                <TextField
                                    id="date"
                                    type="date"
                                    defaultValue={date}
                                    onChange={this.handleChangeFor("choosenDate")}
                                />
                            </form>
                        </Grid>

                        {/* <Grid item xs={4}></Grid>
                        <Grid item xs={8}>
                            <ul>
                                {recentListArray}
                            </ul>
                        </Grid> */}
                    </Grid>
                </div>
            );
        }

        return (
            <div>
                {content}
            </div>
        );
    }
}

const styleGraph = withStyles(styles)(AddCohort)
export default connect(mapStateToProps)(styleGraph);