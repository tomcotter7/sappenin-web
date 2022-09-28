
    window.reactComponents = {};

    window.vueComponents = {};

  
      import React from "react";

      import ReactDOM from "react-dom";


      import ReactWrapper from '../node_modules/better-docs/lib/react-wrapper.js';

      window.React = React;

      window.ReactDOM = ReactDOM;

      window.ReactWrapper = ReactWrapper;

    
    import './styles/reset.css';

    import './styles/iframe.css';

  import Component0 from '../src/components/business/businessBox.js';
reactComponents['BusinessBox'] = Component0;

import Component1 from '../src/components/calendar/Calendar.js';
reactComponents['Calendar'] = Component1;

import Component2 from '../src/components/business/CreateBusiness.js';
reactComponents['CreateBusiness'] = Component2;

import Component3 from '../src/components/deals/CreateDeal.js';
reactComponents['CreateDeal'] = Component3;

import Component4 from '../src/components/business/OwnerBusinesses.js';
reactComponents['OwnerBusinesses'] = Component4;

import Component5 from '../src/components/auth/SignIn.js';
reactComponents['SignIn'] = Component5;

import Component6 from '../src/components/auth/SignUp.js';
reactComponents['SignUp'] = Component6;