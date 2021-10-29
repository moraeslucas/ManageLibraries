import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchLibrary } from './components/FetchLibrary';
import { AddLibrary } from './components/AddLibrary';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/fetchlibrary' component={FetchLibrary} />
    <Route path='/addlibrary' component={AddLibrary} />
</Layout>;
