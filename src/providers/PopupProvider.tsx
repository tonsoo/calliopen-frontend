import { createContext, useContext, useState, useCallback, type ReactNode, type ElementType } from 'react';

interface PopupState {
    isOpen: boolean;
    content: ElementType | null;
    props: Record<string, any>;
}

interface PopupContextType {
    openPopup: (ContentComponent: ElementType, props?: Record<string, any>) => void;
    closePopup: () => void;
    popupState: PopupState;
}

const PopupContext = createContext<PopupContextType | undefined>(undefined);

interface PopupProviderProps {
    children: ReactNode;
}

export const PopupProvider = ({ children }: PopupProviderProps) => {
    const [popupState, setPopupState] = useState<PopupState>({
        isOpen: false,
        content: null,
        props: {},
    });

    const openPopup = useCallback((ContentComponent: ElementType, props: Record<string, any> = {}) => {
        setPopupState({ isOpen: true, content: ContentComponent, props });
    }, []);

    const closePopup = useCallback(() => {
        setPopupState({ isOpen: false, content: null, props: {} });
    }, []);

    return (
        <PopupContext.Provider value={{ openPopup, closePopup, popupState }}>
            {children}
        </PopupContext.Provider>
    );
};

export const usePopup = () => {
    const context = useContext(PopupContext);
    if (context === undefined) {
        throw new Error('usePopup must be used within a PopupProvider');
    }
    return context;
};