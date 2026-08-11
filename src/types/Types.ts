export interface handleModalAction {
    isModalOpen: boolean;
    setIsModalOpen: (value: boolean) => void;
    modalComponent: string;
    setModalComponent: (value: string) => void;
}

export interface handleMsgModalAction {
    isMsgModalOpen: boolean;
    msgModalContent: {result: boolean, message: string};
    setIsMsgModalOpen: (value: boolean) => void;
    setMsgModalContent: (value : { result: boolean; message: string } ) => void;
}

export interface handleAuthModalAction {
    isAuthModalOpen: boolean;
    setIsAuthModalOpen: (value: boolean) => void;
}