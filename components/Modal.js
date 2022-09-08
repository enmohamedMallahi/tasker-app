import React from 'react';
// import './Modal.css';

function Modal({ close, children, title }) {
	return (
		<div className='modal-background'>
			<div className='modal-container'>
				<div className='close-btn'>
					<button
						onClick={() => {
							close();
						}}
					>
						X
					</button>
				</div>
				<div className='title'>
					<h2>{title}</h2>
				</div>
				<div className='body'>{children}</div>
			</div>
		</div>
	);
}

export default Modal;
