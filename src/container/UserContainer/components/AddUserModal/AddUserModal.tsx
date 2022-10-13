import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import Modal from "../../../../common/Modal/Modal";
import useAddUser from "../../hooks/useAddUser";
import ModalButtons from "../../../../common/Modal/ModalActions";
import { Field, FormikProvider } from "formik";

export interface AddUserModalInterface {
	open: boolean;
	closeModal: () => void;
}
const AddUserModal = ({ open, closeModal }: AddUserModalInterface) => {
	const formik = useAddUser({ closeModal });
	const {
		values,
		errors,
		touched,
		handleChange,
		handleBlur,
		handleSubmit,
		isSubmitting,
		resetForm,
	} = formik;
	return (
		<Modal open={open} closeModal={closeModal} title="Add user">
			<form onSubmit={handleSubmit}>
				<FormikProvider value={formik}>
					{Object.keys(values).map((key) => {
						return (
							<div key={key} className="mb-2 last:mb-0">
								<label htmlFor={key}>
									<span className="text-sm font-medium text-gray-800 mb-1 dark:text-white capitalize">
										{key}
									</span>
									<Field
										id={key}
										type={key}
										name={key}
										onChange={handleChange}
										className="disabled:opacity-50 px-4 py-2 text-sm border border-gray-400 rounded focus:outline-none focus:ring-2 ring-indigo-500 w-full"
									/>
								</label>
							</div>
						);
					})}
				</FormikProvider>
				<ModalButtons>
					<button
						type="button"
						className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
						onClick={() => {
							closeModal();
							resetForm();
						}}
					>
						Cancel
					</button>
					<button
						type="submit"
						className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-500  text-base font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2  focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
					>
						Save
					</button>
				</ModalButtons>
			</form>
		</Modal>
	);
};

export default AddUserModal;
