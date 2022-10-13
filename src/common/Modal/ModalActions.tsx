import React, { ReactNode } from "react";

interface ModalButtonsInterface {
	children: ReactNode;
}

export default function ModalButtons({ children }: ModalButtonsInterface) {
	return <div className={`mt-5 sm:mt-4 flex justify-end`}>{children}</div>;
}
