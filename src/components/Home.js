import React from 'react';
import { GEO_OPTIONS } from "../constants";
import { Tabs, Button } from 'antd';


const TabPane = Tabs.TabPane;


export class Home extends React.Component {
    state = {
        loadingGeoLocation: false,
    }
    componentDidMount() {
        this.setState({ loadingGeoLocation: true})
        this.getGeoLocation();
    }

    getGeoLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                this.onSuccessLoadGeoLocation, this.onFailedLoadGeoLocation, GEO_OPTIONS
            );
        } else {

        }
    }

    onSuccessLoadGeoLocation = (position) => {
        this.setState({ loadingGeoLocation: false})
        console.log(position);
    }

    onFailedLoadGeoLocation = (error) => {
        this.setState({ loadingGeoLocation: false})
        console.log(error);
    }

    render() {
        const operations = <Button type="primary">Create New Post</Button>;

        return (
            <div className="main-tabs">
                <Tabs tabBarExtraContent={operations}>
                    <TabPane tab="Posts" key="1">{this.state.loadingGeoLocation ? 'Loading geo location' : ''}</TabPane>
                    <TabPane tab="Map" key="2">Map</TabPane>
                </Tabs>
            </div>
        );
    }
}