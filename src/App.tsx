import React from 'react';
import './App.css';
import { Header } from './components/Header';
import { DeviceInfo } from './components/DeviceInfo';
import { ConnectionInfo } from './components/ConnectionInfo';
import { FingerPrint } from './components/FingerPrint';
import { Permissions } from './components/Permissions';

const App: React.FunctionComponent = () => {
    return (
        <div className="App">
            <Header />
            <div>
                <DeviceInfo />
                <ConnectionInfo />
                <FingerPrint />
                <Permissions />
            </div>
        </div>
    );
};

export default App;
