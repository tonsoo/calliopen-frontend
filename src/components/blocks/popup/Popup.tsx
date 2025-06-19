import React, { useRef, useEffect } from 'react';
import { usePopup } from '../../../providers/PopupProvider';
import './Popup.scss';

const Popup: React.FC = () => {
    const { popupState, closePopup } = usePopup();
    const modalRef = useRef<HTMLDivElement>(null);

    const { isOpen, content: ContentComponent, props } = popupState;

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isOpen) {
                closePopup();
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => {
            window.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, closePopup]);

    if (!isOpen) return null;

    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (modalRef.current && event.target === modalRef.current) {
            closePopup();
        }
    };

    const handleContentClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    };

    return (
        <div className="app-popup has-transitions" ref={modalRef} onClick={handleBackdropClick}>
            <div className="popup-content-wrapper has-transitions" onClick={handleContentClick}>
                {ContentComponent && (
                    <ContentComponent
                        {...props}
                        onClose={closePopup}
                    />
                )}
            </div>
        </div>
    );
};

export default Popup;