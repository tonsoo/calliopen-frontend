import React, { useRef, useEffect } from 'react';
import { useContextMenu } from '../../../providers/ContextMenuProvider';
import './ContextMenu.scss';
import { ReactSVG } from 'react-svg';

const ContextMenu: React.FC = () => {
    const { menuState: contextMenuState, hideMenu: hideContextMenu, setMenuRef } = useContextMenu();
    const menuElementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMenuRef(menuElementRef.current);
        return () => setMenuRef(null);
    }, [setMenuRef, contextMenuState.isOpen]);

    const { isOpen, x, y, items, data } = contextMenuState;

    useEffect(() => {
        if (!isOpen || !menuElementRef.current) return;

        const menu = menuElementRef.current;
        const { innerWidth, innerHeight } = window;
        const { offsetWidth, offsetHeight } = menu;

        const [offsetX, offsetY] = [5, 5];

        let newX = x + offsetX;
        let newY = y + offsetY;

        if (newX + offsetWidth > innerWidth) {
            newX = innerWidth - offsetWidth - 5;
        }

        if (newY + offsetHeight > innerHeight) {
            newY = innerHeight - offsetHeight - 5;
        }

        if (newX < 0) newX = 5;

        menu.style.left = `${newX}px`;
        menu.style.top = `${newY}px`;
    }, [isOpen, x, y, items]);

    if (!isOpen) return null;

    const handleItemClick = (onClick: (data?: any) => void) => {
        hideContextMenu();
        onClick(data);
    };

    const handleMenuEvent = (e: React.MouseEvent) => e.stopPropagation();

    return (
        <div
            ref={menuElementRef}
            className="app-context-menu"
            style={{
                position: 'fixed',
                zIndex: 1000,
            }}
            onClick={handleMenuEvent}
            onContextMenu={handleMenuEvent}
        >
            <ul>
                {items.map(item => (
                    <li
                        key={item.id}
                        className={`context-menu-item hoverable has-transitions ${item.disabled ? 'disabled' : ''}`}
                        onClick={item.disabled ? undefined : () => handleItemClick(item.onClick)}
                        role="menuitem"
                        aria-disabled={item.disabled}
                    >
                        {item.icon && <ReactSVG src={item.icon} className="context-menu-icon icon has-icon aspect-square" />}
                        {item.label}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ContextMenu;