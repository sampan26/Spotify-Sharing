import React, { useState } from 'react';
import hexGen from 'hex-generator';
import { Link } from 'react-router-dom';

import API from '../../utils/API';
import SpotifyAPI from '../../utils/SpotifyAPI';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Alert from 'react-bootstrap/Alert';

import globalUtils from '../../utils/globalUtils';
import utils from './utils';
import './style.css';

const RoomButtons = props => {
	const [input, setInput] = useState('');
	const [showAlert, setShowAlert] = useState(false);

	const syncQueueWithRoomAndJoin = async tracks => {
		try {
			props.renderCenterAlert(props.centerAlertConfig.joinRoom);

			if (tracks && tracks[0]) {
				for await (const track of tracks) {
					await SpotifyAPI.addTrackToQueue(props.token, track.spotifyId);
				}
			}
			props.renderCenterAlert(props.centerAlertConfig.clear);
			globalUtils.addRoomToURL(window.location.href, props.token, input);
		} catch (err) {
			console.log(err);
			props.renderCenterAlert(props.centerAlertConfig.somethingWentWrong);
		}
	};

	const handleJoinRoom = async e => {
		e.preventDefault();

		if (input) {
			const unplayedTracks = await utils.getUnplayedTracks(input);
			unplayedTracks
				? await syncQueueWithRoomAndJoin(unplayedTracks)
				: props.renderCenterAlert(props.centerAlertConfig.noRoomData);
		} else {
			setShowAlert(true);
			setTimeout(() => setShowAlert(false), 3000);
		}
	};

	const handleCreateRoom = async () => {
		try {
			props.renderCenterAlert(props.centerAlertConfig.createRoom);
			const { data } = await API.createRoom(hexGen(16));

		} catch(err) {
			console.log(err);
			props.renderCenterAlert(props.centerAlertConfig.somethingWentWrong);

		}
	};


	return (
		<div>
			<Row className="fixed-bottom room-buttons-container">
				<Col md={8} xs={12}>
					<Form>
						{props.token ? (
							<InputGroup>
								<button
									className="join-room-btn"
									onClick={e => handleJoinRoom(e)}>
									Join Room
								</button>

								<input
									className="room-input ml-2"
									onChange={e => setInput(e.target.value)}
									value={input}
									placeholder="Room code"
								/>
							</InputGroup>
						) : null}
					</Form>
					<Alert show={showAlert} variant="warning">
						Please enter a valid Room Code
					</Alert>
				</Col>
				<Col md={4} xs={12}>
					<button
						className="float-right create-room-btn"
						onClick={() => handleCreateRoom()}>
						Create a Room
					</button>
				</Col>
			</Row>
		</div>
	);
};

export default RoomButtons;
