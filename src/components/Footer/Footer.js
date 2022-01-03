import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import './Footer.css';

function Footer() {
	return (
		<footer>
			<div>
				<small>
					Reddit icon provided by&nbsp;
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
