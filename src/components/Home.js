import React from 'react';
import {API_ROOT, GEO_OPTIONS, TOKEN_KEY, AUTH_PREFIX} from "../constants";
import { Tabs, Button, Spin } from 'antd';
import { POS_KEY } from "../constants";
import $ from 'jquery';

const TabPane = Tabs.TabPane;


export class Home extends React.Component {
    state = {
        loadingGeoLocation: false,
        loadingPost: false,
        error: '',
    }
    componentDidMount() {
        this.getGeoLocation();
    }

    getGeoLocation = () => {
        this.setState({ loadingGeoLocation: true, error: ''})
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                this.onSuccessLoadGeoLocation, this.onFailedLoadGeoLocation, GEO_OPTIONS
            );
        } else {
            this.setState( {
                error: 'Your browser does not support geolocation!',
            })
        }
    }

    onSuccessLoadGeoLocation = (position) => {
        this.setState({ loadingGeoLocation: false, error: ''})
        console.log(position);
        const { latitude, longitude } = position.coords;
        localStorage.setItem(POS_KEY, JSON.stringify({lat: latitude, lon: longitude }));
        this.loadNearByPosts();
    }

    onFailedLoadGeoLocation = (error) => {
        this.setState({ loadingGeoLocation: false, error: 'Failed to load geo location!'})
        console.log(error);
    }

    loadNearByPosts = () => {
        this.setState({loadingPost: true, error: ''})
        const {lat, lon} = JSON.parse(localStorage.getItem(POS_KEY));
        $.ajax({
            url:`${API_ROOT}/search?lat=${lat}&lon=${lon}&range=20000`,
            method: 'GET',
            headers: {
                Authorization: `${AUTH_PREFIX} ${localStorage.getItem(TOKEN_KEY)}`
            }
        }).then((response) => {
            console.log(response);
            this.setState({loadingPost: false, error: ''});
        }, (response) => {
            console.log(response.responseText)
            this.setState({loadingPost: false, error: 'Failed to load posts!'})
        }).catch((error) =>{
            console.log(error);
        });
    }

    getGalleryPanelContent = () => {
        if (this.state.error) {
            return <div>{this.state.error}</div>
        } else if (this.state.loadingGeoLocation) {
            return <Spin tip="Loading geo location..."/>
        } else if (this.state.loadingPost) {
            return <Spin tip="Loading posts..."/>
        } else {
            return '';
        }
    }

    render() {
        const operations = <Button type="primary">Create New Post</Button>;

        return (
            <div className="main-tabs">
                <Tabs tabBarExtraContent={operations}>
                    <TabPane tab="Posts" key="1">
                        {this.getGalleryPanelContent()}
                    </TabPane>
                    <TabPane tab="Map" key="2">Map</TabPane>
                </Tabs>
            </div>
        );
    }
}