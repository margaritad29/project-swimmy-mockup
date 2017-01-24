import React from 'react';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import {computed} from 'mobx';


import EventSearch from './eventSearch';
import YourEvents from './YourEvents';

import DevTool from 'mobx-react-devtools';

@observer
export default class EventsList extends React.Component {
	@observable events = this.props.rootStore.eventStore.events;

	constructor(props) {
		super(props);
		this.state = {
			searchVisible: false,
			eventFilter: "New"
		};
	}

	render() {
		const {rootStore} = this.props;
		let view;

		if (!this.state.searchVisible) {
			view = (
				<div>
					<YourEvents rootStore={rootStore}></YourEvents>
				</div>
				);
		} else {
			view = (
				<div>
					<div className="form-event">
						<button className="btn btn-primary btn-sm ps-group-back-btn" onClick={this.toggleSearch.bind(this)}>
							<span className="fa fa-angle-double-left" aria-hidden="true"></span> Back to your events
						</button>
					</div>
					<EventSearch rootStore={rootStore}></EventSearch>
				</div>
				);
		}
		return (
			<div>
				<div className="row">
					<div className="col-xs-8">
						<h2>Events</h2>
					</div>
					<div className="col-xs-4 text-right">
						{ this.renderSearchButton() }
					</div>
				</div>
				<div className="row">
					<div className="col-xs-12">
						{ view }
					</div>
				</div>
			</div>
		);
	}

	renderSearchButton = () => {
		if (!this.state.searchVisible) {
			return (
				<div className="form-event">
					<button className="btn btn-primary btn-lg ps-find-groups-btn" onClick={this.toggleSearch.bind(this)}>
						<span className="fa fa-search" aria-hidden="true"></span> Find events
					</button>
				</div>
				);
		}
	}

	toggleSearch = () => {
		let searchVisible = !this.state.searchVisible;
		this.setState({
			searchVisible: searchVisible
		});
	}

	changeEventFilter = (newEventFilter) => {
		this.setState({
			eventFilter:newEventFilter
		});
	}
}
