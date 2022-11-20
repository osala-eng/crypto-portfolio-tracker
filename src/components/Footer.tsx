import React from 'react';
import './css/Footer.css';
import linkedin from '../assets/linkedin.png';
import facebook from '../assets/facebook.png';
import twitter from '../assets/twitter.png';

const icon = 30;

const Footer = () => {
    return (
        <footer id='footer_container'>
            <div className='footer-div'></div>
            <div id='copyright_notice' className='footer-div'>
                Copyright Crypto Tracker
            </div>
            <div className='footer-div' id='sm_links'>
                <a href="//skillreactor.io" id='sm_linkedin' className='image-icos'>
                    <img src={linkedin} alt="linkedin icon" width={icon}
                        height={icon}  />
                </a>
                <a href="//skillreactor.io" id='sm_facebook' className='image-icos'>
                    <img src={facebook} alt="facebook icon" width={icon}
                        height={icon} />
                </a>
                <a href="//skillreactor.io" id='sm_linkedin' className='image-icos'>
                    <img src={twitter} alt='twitter icon' width={icon}
                        height={icon} />
                </a>
            </div>
        </footer>
    )
}

export default Footer;
