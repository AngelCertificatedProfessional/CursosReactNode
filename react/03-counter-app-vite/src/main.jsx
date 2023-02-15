import React from 'react';
import {createRoot} from 'react-dom/client';
import {App} from './HelloWordApp'
import {FirstApp} from './FirstApp'
import './styles.css'

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <FirstApp/>
    </React.StrictMode>
)