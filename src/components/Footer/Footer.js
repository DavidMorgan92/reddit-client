import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import './Footer.css';

function Footer() {
	return (
		<footer>
			<div>
				<small>
					<a href='https://iconscout.com/icon/social-304' target='_blank' rel='noopener noreferrer'>
						Reddit icon&nbsp;
						<sup><FontAwesomeIcon icon={faExternalLinkAlt} /></sup>
					</a>
					&nbsp;provided by&nbsp;
					<a href='https://iconscout.com/contributors/pocike' target='_blank' rel='noopener noreferrer'>
						"Those Icons"&nbsp;
						<sup><FontAwesomeIcon icon={faExternalLinkAlt} /></sup>
					</a>
				</small>
			</div>
		</footer>
	);
}

export default Footer;
