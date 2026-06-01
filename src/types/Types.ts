export interface handleModalAction {
    isModalOpen: boolean;
    setIsModalOpen: (value: boolean) => void;
    modalComponent: string;
    setModalComponent: (value: string) => void;
}