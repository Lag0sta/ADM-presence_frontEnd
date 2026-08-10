export interface handleModalAction {
    isModalOpen: boolean;
    setIsModalOpen: (value: boolean) => void;
    modalComponent: string;
    setModalComponent: (value: string) => void;
}

export interface handleMsgModalAction {
    isMsgModalOpen: boolean;
    msgModalContent: string;
    setIsMsgModalOpen: (value: boolean) => void;
    setMsgModalContent: (value: string) => void;
}

export interface handleAuthModalAction {
    isAuthModalOpen: boolean;
    setIsAuthModalOpen: (value: boolean) => void;
}