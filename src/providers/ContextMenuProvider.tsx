import { createContext, useContext, useState, useCallback, useEffect, useRef, type ReactNode } from 'react';

export interface ContextMenuItem {
    id: string;
    label: string;
    onClick: (data?: any) => void;
    icon?: string;
    disabled?: boolean;
}

interface ContextMenuState {
    isOpen: boolean;
    x: number;
    y: number;
    items: ContextMenuItem[];
    data?: any;
}

interface ContextMenuContextType {
    showMenu: (x: number | null, y: number | null, items: ContextMenuItem[], data?: any) => void;
    hideMenu: () => void;
    menuState: ContextMenuState;
    setMenuRef: (ref: HTMLDivElement | null) => void;
}

const ContextMenuContext = createContext<ContextMenuContextType | undefined>(undefined);

interface ContextMenuProviderProps {
    children: ReactNode;
}

export const ContextMenuProvider = ({ children }: ContextMenuProviderProps) => {
    const [contextMenuState, setContextMenuState] = useState<ContextMenuState>({
        isOpen: false,
        x: 0,
        y: 0,
        items: [],
        data: undefined,
    });

    const isOpeningRef = useRef(false);

    const showContextMenu = useCallback((x: number | null, y: number | null, items: ContextMenuItem[], data?: any) => {
        if (items.length == 0) return;

        isOpeningRef.current = true;
        setContextMenuState({ isOpen: true, x: x ?? contextMenuState.x, y: y ?? contextMenuState.y, items, data });
        setTimeout(() => isOpeningRef.current = false, 100);
    }, []);

    const hideContextMenu = useCallback(() => {
        if (isOpeningRef.current) return;
        setContextMenuState(prevState => ({ ...prevState, isOpen: false }));
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isOpeningRef.current) return;

            if (contextMenuState.isOpen && menuDomRef.current && !menuDomRef.current.contains(event.target as Node)) {
                hideContextMenu();
            }
        };

        const handleScroll = () => {
            if (contextMenuState.isOpen) return;
            hideContextMenu();
        };

        let attachListenersTimeout: number;

        if (contextMenuState.isOpen) {
            attachListenersTimeout = window.setTimeout(() => {
                window.addEventListener('click', handleClickOutside, true);
                window.addEventListener('scroll', handleScroll, true);
            }, 50);
        }

        return () => {
            clearTimeout(attachListenersTimeout);
            window.removeEventListener('click', handleClickOutside, true);
            window.removeEventListener('scroll', handleScroll, true);
        };
    }, [contextMenuState.isOpen, hideContextMenu]);

    const menuDomRef = useRef<HTMLDivElement | null>(null);
    const setMenuRef = useCallback((ref: HTMLDivElement | null) => {
        menuDomRef.current = ref;
    }, []);


    return (
        <ContextMenuContext.Provider value={{ showMenu: showContextMenu, hideMenu: hideContextMenu, menuState: contextMenuState, setMenuRef }}>
            {children}
        </ContextMenuContext.Provider>
    );
};

export const useContextMenu = () => {
    const context = useContext(ContextMenuContext);
    if (context === undefined) {
        throw new Error('useContextMenu must be used within a ContextMenuProvider');
    }
    return context;
};