import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import hexGen from 'hex-generator';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

import './style.css';

import RoomButtons from '../../components/RoomButtons';

// import './style.css';

import config from './config';
// import API from '../../utils/API';
import spotifyHelpers from '../../utils/spotifyHelpers';


const Home = () => {
    const [user, setUser] = useState(null);
    const [spotifyAlert, setSpotifyAlert] = useState(false);
    const [joinAlert, setJoinAlert] = useState(false);
    const [spinnerDisplay, setSpinnerDisplay] = useState(false);

    const [centerAlert, setCenterAlert] = useState(config.centerAlert.clear);
    const parsedURL = queryString.parse(window.location.search);
    const token = parsedURL.access_token;

    const handleUser = async () => {
        const currentUser = await spotifyHelpers.user(token);
        if (currentUser) setUser(currentUser);
      };


    const verifyTrackPlaying = async () => {
        !spotifyAlert ? setSpotifyAlert(true) : setSpotifyAlert(false);
    };

    const renderCenterAlert = errrorObj => {
        setCenterAlert(errrorObj);

        if (errrorObj.disappear) {
            setTimeout(() => setCenterAlert(config.centerAlert.clear), 3000);
        }
    };


    useEffect(() => {
        if (token && !user) {
            if (spinnerDisplay) setSpinnerDisplay(false);
            handleUser(token);
            verifyTrackPlaying(token);
        }
    })

    return (
        <div>
            <Container>
                <Row className = 'top-banner'>
                    {/* Profile Image */}
                    <Col xs={12} sm={12} md={3} lg={2} className='text-center'>
                        <Image roundedCircle src={user.image} className='home profile-pic' />
                        <p className='user-name'>{user.name}</p>
                    </Col>

                    {/* Welcome to Playify Banner */}
                    <Col
                        xs={12}
                        sm={12}
                        md={6}
                        lg={7}
                        className='d-flex justify-content-center align-items-center'
                    >
                        <h1 className='home-banner'>
                            Welcome to <span className='welcome-brand'>Playify</span>
                        </h1>
                    </Col>

                    <Col xs={12} md={3} lg={3}>
                        <div className='d-flex align-items-center'>
                        <Alert variant='dark' show={spotifyAlert}>
                            <p>To queue up songs when joining a Room, open Spotify & play a track</p>
                            <button className='alert-button' onClick={() => verifyTrackPlaying()}>
                            Ready
                            </button>
                        </Alert>
                        </div>
                    </Col>
                </Row>
            </Container>

        {/* Room Buttons */}
        <Container>
            <RoomButtons
            token={token}
            // setUrl={this.setUrl}
            // setJoinRoomAlert={setJoinAlert}
            renderCenterAlert={renderCenterAlert}
            centerAlertConfig={config.centerAlert}
            // setState={this.setState}
            />
        </Container>
        </div>
    );

}

export default Home;