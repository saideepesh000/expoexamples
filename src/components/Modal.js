import React from 'react';
import ReactDOM from 'react-dom';
import ReactMarkdown from 'react-markdown';
import {FaGithub} from 'react-icons/fa'; 

import renderers from '../renderers.js';

import './modal.styles.css';

const Modal = ({ isShowing, hide, repo }) =>
  isShowing
    ? ReactDOM.createPortal(
        <>
          <div className="modal-overlay" />
          <div
            className="modal-wrapper"
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
          >
            <div className="modal">
              <div className="modal-header">
                <button
                  type="button"
                  className="modal-close-button"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={hide}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <FaGithub/>
              <ReactMarkdown renderers={renderers} allowDangerousHtml>
                {repo.content
                  ? repo.content
                  : '### No README.md for this, Ask Them Create One'}
              </ReactMarkdown>
            </div>
          </div>
        </>,
        document.body
      )
    : null;

export default Modal;
